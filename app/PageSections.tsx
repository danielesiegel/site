'use client';
import { useState } from 'react';
import { Link } from 'next-view-transitions';

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ease-in-out ${isOpen ? 'rotate-180' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-0.5 text-left font-medium text-gray-800 hover:text-gray-600 transition-colors"
      >
        <span>{title}</span>
        <ChevronIcon isOpen={isOpen} />
      </button>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 200ms ease-in-out',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div className="pt-2 pb-2 text-gray-800">{children}</div>
        </div>
      </div>
    </div>
  );
}

const lc = 'text-blue-500 hover:text-blue-700';

export function PageSections() {
  return (
    <div className="border-t border-gray-200">
      <AccordionItem title="Projects">
        <div className="space-y-0.5">
          {[
            { name: 'Haptics', href: '/n/smarthug' },
            { name: 'Logarithm Labs', href: '/n/wip' },
            { name: 'Prosthetic Arm', href: '/n/octograsp' },
            { name: 'Quantum Register', href: '/n/katmai' },
            { name: 'AR Headset', href: '/n/photon' },
            { name: 'Blind Cane', href: '/n/surround' },
            { name: 'Gym Optimizer', href: 'https://devpost.com/software/gymbo', external: true },
            { name: 'Prosthetic Prototypes', href: '/n/prosthetics' },
            { name: 'Sawtooth Soundsystem', href: 'https://www.instagram.com/sawtoothsoundsystem/', external: true },
            { name: '3D Print Farm Tracker', href: '/n/3dprint' },
            { name: 'Axial and Rotational Manipulators', href: '/n/pyramidal' },
            { name: 'Home 3D Print Farm + Lab', href: '/n/homeprintfarm' },
          ].map((p) => (
            <div key={p.name}>
              {'external' in p && p.external ? (
                <a href={p.href} target="_blank" rel="noopener noreferrer" className={lc}>{p.name}</a>
              ) : (
                <Link href={p.href} className={lc}>{p.name}</Link>
              )}
            </div>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem title="Academics">
        <div className="space-y-1.5">
          <p>
            <a href="https://www.latex-project.org/about/" target="_blank" rel="noopener noreferrer" className={lc}>LaTeX</a>{' '}
            Notes &nbsp;-&nbsp; <Link href="/n/calc2latex" className={lc}>Calculus II</Link> /{' '}
            <Link href="/n/embedded" className={lc}>Embedded Systems</Link>
          </p>
          <p>
            <strong className="font-medium">Clubs &amp; Societies</strong> -{' '}
            <a href="https://tufts.presence.io/organization/institute-of-electrical-and-electronics-engineers-ieee" target="_blank" rel="noopener noreferrer" className={lc}>Tufts IEEE</a>,{' '}
            <a href="https://tufts.presence.io/organization/jumbo-fire-flow" target="_blank" rel="noopener noreferrer" className={lc}>Jumbo Juggling / Fire &amp; Flow Club</a>,{' '}
            Mitre eCTF, Tufts Solar Vehicle Project (<a href="https://sites.tufts.edu/solarvp/" target="_blank" rel="noopener noreferrer" className={lc}>TSVP</a>),{' '}
            <a href="https://www.instagram.com/musicprodclub/" target="_blank" rel="noopener noreferrer" className={lc}>Music Production Club</a>,{' '}
            <a href="https://as.tufts.edu/physics/resources/society-physics-students" target="_blank" rel="noopener noreferrer" className={lc}>Society of Physics Students</a>
          </p>
          <div>
            <p className="font-medium">Lab Affiliations</p>
            <p className="mt-2">
              Tufts <a href="https://sites.tufts.edu/idea/" target="_blank" rel="noopener noreferrer" className={lc}>IDEALab</a> (Prof. James Intriligator),{' '}
              <a href="https://innovationlabs.harvard.edu/" target="_blank" rel="noopener noreferrer" className={lc}>Harvard Innovation Labs</a>,{' '}
              <a href="https://nolop.org/" target="_blank" rel="noopener noreferrer" className={lc}>Nolop</a> FAST Facility,{' '}
              Stanford <a href="https://pyramidal.stanford.edu/" target="_blank" rel="noopener noreferrer" className={lc}>Pyramidal Lab</a> (Prof. Mark Schnitzer),{' '}
              Stanford <a href="https://biomechatronics.stanford.edu/" target="_blank" rel="noopener noreferrer" className={lc}>Biomechatronics Lab</a>,{' '}
              De Anza <a href="https://www.deanza.edu/dmt/" target="_blank" rel="noopener noreferrer" className={lc}>Additive Manufacturing Lab</a>
            </p>
          </div>
        </div>
      </AccordionItem>

      <AccordionItem title="Awards">
        <ul className="list-disc pl-5 space-y-0.5">
          <li className="pl-1">Emerging Tech Winner - JumboHack Hackathon</li>
          <li className="pl-1">
            OctoGrasp
            <ul className="list-disc pl-5 space-y-0.5 mt-0.5">
              <li className="pl-1">Grand Award - International Science and Engineering Fair (2nd Place in Biomedical Engineering)</li>
              <li className="pl-1">Grand Prize - Best of Championship (Physical Sciences) - Synopsys Silicon Valley Science and Technology Championship</li>
              <li className="pl-1">1st Award, Physical Science and Engineering Category - Synopsys Silicon Valley Science and Technology Championship</li>
              <li className="pl-1">IBM Award</li>
              <li className="pl-1">Office of Naval Research - United States Navy / US Marine Corps Award</li>
              <li className="pl-1">IEEE Electro-Technology Award</li>
              <li className="pl-1">2nd Place, California Science and Engineering Fair</li>
            </ul>
          </li>
          <li className="pl-1">Silicon Valley Engineering Council Award (dinner w/ Jensen Huang lol)</li>
          <li className="pl-1">
            Surround3
            <ul className="list-disc pl-5 space-y-0.5 mt-0.5">
              <li className="pl-1">Castro Family Award for Best Physical Science Projects - Synopsys Silicon Valley Science and Technology Championship</li>
              <li className="pl-1">1st Award, Physical Science and Engineering Category - Synopsys Silicon Valley Science and Technology Championship</li>
              <li className="pl-1">Synopsys Outreach Foundation n+1 Prize</li>
              <li className="pl-1">Nominated to compete - Broadcom MASTERS</li>
              <li className="pl-1">Honorable Mention, California Science and Engineering Fair</li>
            </ul>
          </li>
          <li className="pl-1">Weights &amp; Biases Award - WeaveHacks</li>
          <li className="pl-1">3rd Place - Tufts Robot-a-thon</li>
          <li className="pl-1">Honorable Mention - Code Metal Smart Cities Hackathon</li>
          <li className="pl-1">ONR Medallion, United States Navy and Marine Corps</li>
          <li className="pl-1">Video Design Award - First Robotics Competition (FRC)</li>
        </ul>
      </AccordionItem>

      <AccordionItem title="Personal Info">
        <ul className="list-disc pl-5 space-y-0.5">
          <li className="pl-1"><a href="https://www.youtube.com/@DanielESiegel" target="_blank" rel="noopener noreferrer" className={lc}>YouTube</a> Channel</li>
          <li className="pl-1"><a href="https://scenicsynths.com" target="_blank" rel="noopener noreferrer" className={lc}>scenicsynths</a></li>
          <li className="pl-1">Ideas/Suggestions/Questions? <a href="mailto:daniel@integralmimetics.com" className={lc}>Email Me!</a></li>
        </ul>
      </AccordionItem>
    </div>
  );
}
