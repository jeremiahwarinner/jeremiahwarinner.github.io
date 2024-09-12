import React from 'react';
import { Code, Calendar, BarChart2, FileSpreadsheet, Mail } from 'lucide-react';

const getProjectIcon = (projectType) => {
  switch (projectType) {
    case 'web': return <Code size={40} />;
    case 'scheduling': return <Calendar size={40} />;
    case 'analysis': return <BarChart2 size={40} />;
    case 'data': return <FileSpreadsheet size={40} />;
    case 'mail': return <Mail size={40} />;
    default: return <Code size={40} />;
  }
};

const ProjectGrid = ({ projects, openProjectModal }) => {
  return (
    <>
      {projects.map((project) => (
        <div
          key={project.id}
          className="aspect-square overflow-hidden rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
          onClick={() => openProjectModal(project)}
        >
          <div className="w-full h-full p-4 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 mb-4 flex items-center justify-center text-purple-300">
              {getProjectIcon(project.type)}
            </div>
            <h3 className="text-lg font-semibold mb-2 text-purple-300">{project.title}</h3>

          </div>
        </div>
      ))}
    </>
  );
};

export default ProjectGrid;