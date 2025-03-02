import type { NextApiRequest, NextApiResponse } from 'next';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { movementData, nodes } = req.body;
    // Write input data to a temporary JSON file for the Python script.
    const inputData = { movementData, nodes };
    const tmpInputPath = path.join(process.cwd(), 'temp_input.json');
    fs.writeFileSync(tmpInputPath, JSON.stringify(inputData));

    // Adjust the path to your Python script relative to the project root.
    const pythonScript = path.join(process.cwd(), 'backend', 'process_audio.py');

    // Spawn the Python process.
    const pythonProcess = spawn('python', [pythonScript, tmpInputPath]);

    pythonProcess.stdout.on('data', (data: Buffer) => {
      console.log(`stdout: ${data.toString()}`);
    });
    pythonProcess.stderr.on('data', (data: Buffer) => {
      console.error(`stderr: ${data.toString()}`);
    });
    pythonProcess.on('close', (code: number) => {
      console.log(`Python process exited with code ${code}`);
      // On success, return the URL to the generated audio file.
      // (You might need to adjust this if you want to serve the file differently.)
      res.status(200).json({ success: true, fileUrl: '/api/download/audio' });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
