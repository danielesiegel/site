#!/usr/bin/env python3
import sys
import json
import os
import math
from pydub import AudioSegment

def load_samples():
    """
    Load all WAV samples from the "samples" directory.
    Assumes each filename (without extension) is the object identifier.
    """
    sample_dir = os.path.join(os.path.dirname(__file__), 'samples')
    samples = {}
    if not os.path.exists(sample_dir):
        print("Samples directory does not exist:", sample_dir)
        return samples
    for filename in os.listdir(sample_dir):
        if filename.lower().endswith('.wav'):
            object_id = os.path.splitext(filename)[0]
            samples[object_id] = os.path.join(sample_dir, filename)
    return samples

def add_reverb(audio, delay_ms=50, decay_db=6, repetitions=3):
    """
    Adds a simple reverb effect by overlaying delayed, quieter copies.
    :param audio: AudioSegment instance.
    :param delay_ms: Delay in milliseconds between echoes.
    :param decay_db: Decibel reduction per echo.
    :param repetitions: Number of echoes.
    :return: AudioSegment with reverb applied.
    """
    output = audio
    for i in range(1, repetitions + 1):
        silence = AudioSegment.silent(duration=delay_ms * i)
        delayed = silence + audio
        delayed = delayed - (decay_db * i)
        output = output.overlay(delayed)
    return output

def map_bandpass_frequencies(distance, min_d=1.0, max_d=10.0):
    """
    Map a node's distance to a bandpass frequency range.
    Clamps the distance to the [min_d, max_d] range and linearly interpolates:
      - At min_d: low = 500 Hz, high = 1500 Hz.
      - At max_d: low = 40 Hz,  high = 150 Hz.
    :param distance: The distance from the reference (in arbitrary units).
    :return: (low_freq, high_freq) tuple.
    """
    clamped_distance = max(min_d, min(distance, max_d))
    near_low, near_high = 500.0, 1500.0
    far_low, far_high = 40.0, 150.0
    fraction = (clamped_distance - min_d) / (max_d - min_d)
    low_freq = near_low + (far_low - near_low) * fraction
    high_freq = near_high + (far_high - near_high) * fraction
    return low_freq, high_freq

def process_audio(data):
    """
    Process audio based on the movement data and nodes.
    For each node:
      - Compute its distance from the origin.
      - Load its sample (matching node['object'] to a WAV filename).
      - Map the distance to a bandpass filter range.
      - Apply the bandpass filter.
      - Optionally add a reverb effect if node['selected'] is True.
      - Loop the processed sample to a fixed duration.
    Finally, overlay all tracks and export to MP3.
    """
    movement_data = data.get('movementData', {})
    nodes = data.get('nodes', [])
    samples = load_samples()
    
    print("Starting audio processing...")

    # Duration (in milliseconds) for each track; default to 10 seconds.
    track_duration = int(movement_data.get('duration', 10000))
    processed_tracks = []

    for node in nodes:
        obj_id = node.get('object')
        if not obj_id:
            continue
        sample_file = samples.get(obj_id)
        if not sample_file:
            print(f"No sample found for object: {obj_id}")
            continue
        try:
            audio = AudioSegment.from_wav(sample_file)
        except Exception as e:
            print(f"Error loading sample {sample_file}: {e}")
            continue

        # Compute Euclidean distance from the origin using x, y, z coordinates.
        try:
            x = float(node.get('x', 0))
            y = float(node.get('y', 0))
            z = float(node.get('z', 0))
        except ValueError:
            print("Invalid coordinates for node:", node)
            continue
        distance = math.sqrt(x * x + y * y + z * z)
        print(f"Processing node '{obj_id}' at distance {distance:.2f}")

        # Map the distance to a bandpass filter range.
        low_freq, high_freq = map_bandpass_frequencies(distance)
        print(f"Applying bandpass filter: {low_freq:.1f} Hz - {high_freq:.1f} Hz")
        filtered = audio.high_pass_filter(low_freq).low_pass_filter(high_freq)

        # If the node is "selected", add a reverb effect.
        if node.get('selected', False):
            filtered = add_reverb(filtered, delay_ms=50, decay_db=6, repetitions=3)

        # Loop the processed sample to match the desired track duration.
        loops = (track_duration // len(filtered)) + 1
        looped = filtered * loops
        track = looped[:track_duration]
        processed_tracks.append(track)

    if not processed_tracks:
        print("No processed tracks available. Exiting.")
        return None

    # Combine tracks by overlaying them.
    final_mix = processed_tracks[0]
    for track in processed_tracks[1:]:
        final_mix = final_mix.overlay(track)

    output_file = os.path.join(os.path.dirname(__file__), 'output.mp3')
    try:
        final_mix.export(output_file, format='mp3')
    except Exception as e:
        print("Error exporting final mix:", e)
        return None

    print("Audio processing complete. Output saved at:", output_file)
    return output_file

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python process_audio.py <input_json>")
        sys.exit(1)
    input_path = sys.argv[1]
    if not os.path.exists(input_path):
        print("Input JSON file does not exist:", input_path)
        sys.exit(1)
    with open(input_path, 'r') as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError as e:
            print("Error decoding JSON:", e)
            sys.exit(1)
    process_audio(data)
