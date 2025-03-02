
"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import MovementForm, { MovementFormData } from './MovementForm';

export default function MovementFormWrapper() {
  const router = useRouter();

  const handleProcess = (formData: MovementFormData) => {
    console.log("Processed form data:", formData);
    // Uncomment and modify the following line if you want to navigate after processing:
    // router.push('/results');
  };

  return <MovementForm onProcess={handleProcess} />;
}
