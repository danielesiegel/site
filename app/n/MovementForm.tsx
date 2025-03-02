"use client";

import { useState, ChangeEvent, FormEvent } from 'react';

export interface MovementFormData {
  startX: string;
  startY: string;
  startZ: string;
  startLR: string;
  startUD: string;
  endX: string;
  endY: string;
  endZ: string;
  endLR: string;
  endUD: string;
}

interface MovementFormProps {
  onProcess: (data: MovementFormData) => void;
}

const MovementForm: React.FC<MovementFormProps> = ({ onProcess }) => {
  const [formData, setFormData] = useState<MovementFormData>({
    startX: '',
    startY: '',
    startZ: '',
    startLR: '',
    startUD: '',
    endX: '',
    endY: '',
    endZ: '',
    endLR: '',
    endUD: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onProcess(formData);
  };

  const fields = [
    { label: 'Start X', name: 'startX' },
    { label: 'Start Y', name: 'startY' },
    { label: 'Start Z', name: 'startZ' },
    { label: 'Start Left/Right', name: 'startLR' },
    { label: 'Start Up/Down', name: 'startUD' },
    { label: 'End X', name: 'endX' },
    { label: 'End Y', name: 'endY' },
    { label: 'End Z', name: 'endZ' },
    { label: 'End Left/Right', name: 'endLR' },
    { label: 'End Up/Down', name: 'endUD' },
  ];

  return (
    <details style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '5px' }}>
      <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '1rem' }}>
        Movement Parameters
      </summary>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name} style={{ marginBottom: '0.5rem' }}>
            <label style={{ marginRight: '0.5rem' }}>{field.label}:</label>
            <input
              type="text"
              name={field.name}
              value={formData[field.name as keyof MovementFormData]}
              onChange={handleChange}
              style={{ padding: '0.25rem', fontSize: '1rem' }}
            />
          </div>
        ))}
        <button type="submit" style={{ padding: '0.5rem 1rem', marginTop: '0.5rem' }}>
          Process
        </button>
      </form>
    </details>
  );
};

export default MovementForm;
