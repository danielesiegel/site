"use client";

import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core'; // Core viewer and worker
import '@react-pdf-viewer/core/lib/styles/index.css'; // Default styles for react-pdf-viewer
import { GlobalWorkerOptions } from 'pdfjs-dist';

// Configure the worker to match the installed API version
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

const TeXpressDocumentation: React.FC = () => {
  const pdfUrl = '/files/TeXpressDocumentation.pdf'; // Path to your PDF file

  return (
    <>
      {/* Inline style to override drop shadow */}
      <style>
        {`
          .rpv-core__inner-page {
            box-shadow: none !important; /* Remove drop shadow */
            border: none !important; /* Remove border */
            margin: 0 !important; /* Remove margin */
            padding: 0 !important; /* Remove padding */
          }
        `}
      </style>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', margin: 0, padding: 0 }}>
        <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js">
          <Viewer fileUrl={pdfUrl} />
        </Worker>
      </div>
    </>
  );
};

export default TeXpressDocumentation;
