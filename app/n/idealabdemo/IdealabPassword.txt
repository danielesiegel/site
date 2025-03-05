"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatedName } from '../animated-name.tsx';

export default function IdealabPasswordPage() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simplified password check: must match "demo"
    if (password === 'demo') {
      // Mark as authenticated (for simple authentication)
      localStorage.setItem('authenticated', 'true');
      // Redirect to the Idealab index page (assumed to be at /n/idealab)
      router.push('/n/idealab');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <AnimatedName />
      <h2>Please Log In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <button type="submit" style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>
          Login
        </button>
      </form>
    </div>
  );
}
