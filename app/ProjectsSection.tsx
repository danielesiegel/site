'use client'

import React from 'react';
import { ProjectLink } from './ProjectLink';
import { Columns, Column } from './Columns';
import { currentProjects, pastProjects } from './ProjectContext';

// Reusable separator component with consistent styling
const Separator = () => (
  <span style={{ margin: '0 0.5rem', color: '#666' }}>/</span>
);

export function ProjectsSection() {
  return (
    <>
      <h2>Projects</h2>
      
      <Columns>
        <Column>
          <div>
            <strong>Current</strong><br />
            <div style={{ marginTop: '0.5rem' }}>
              {currentProjects.map((project, index) => (
                <React.Fragment key={project.id}>
                  {index > 0 && <Separator />}
                  <ProjectLink projectId={project.id} href={project.href}>
                    {project.title}
                  </ProjectLink>
                </React.Fragment>
              ))}
            </div>
          </div>
        </Column>

        <Column>
          <div>
            <strong>Past</strong><br />
            <div style={{ marginTop: '0.5rem' }}>
              {pastProjects.map((project, index) => (
                <React.Fragment key={project.id}>
                  {index > 0 && <Separator />}
                  <ProjectLink projectId={project.id} href={project.href}>
                    {project.title}
                  </ProjectLink>
                </React.Fragment>
              ))}
            </div>
          </div>
        </Column>
      </Columns>
    </>
  );
} 