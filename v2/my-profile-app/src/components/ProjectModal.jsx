import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ExternalLink, Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import CustomCursor from './CustomCursor';

const ProjectModal = ({ isZooming, closeProjectModal, activeProject }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const modalContentRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
        closeProjectModal();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [closeProjectModal]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-95 z-50 overflow-auto transition-all duration-500 ease-in-out ${
        isZooming ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}
    >
      <div ref={modalContentRef} className="max-w-2xl mx-auto my-8 bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center">
            <button 
              onClick={closeProjectModal} 
              className="mr-4 hover:bg-gray-700 hover:bg-opacity-50 rounded-full p-2 text-purple-400 transition-colors duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center">
              <span className="text-2xl mr-3" role="img" aria-label="Fire">🔥</span>
              <span className="font-semibold text-white">{activeProject?.title}</span>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white">
            <MoreHorizontal size={24} />
          </button>
        </div>
        
        {/* Image Container */}
        <div className="w-full h-[600px] bg-gray-900 flex items-center justify-center overflow-hidden">
          <img 
            src={activeProject?.image} 
            alt={activeProject?.title} 
            className="w-full h-full object-contain" 
          />
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-between items-center p-4">
          <div className="flex space-x-4">
            <button 
              onClick={() => setIsLiked(!isLiked)} 
              className={`${isLiked ? 'text-red-500' : 'text-white'} hover:text-red-500 transition-colors duration-300`}
            >
              <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
            </button>
            <button className="text-white hover:text-gray-300 transition-colors duration-300">
              <MessageCircle size={24} />
            </button>
            <button className="text-white hover:text-gray-300 transition-colors duration-300">
              <Send size={24} />
            </button>
          </div>
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className={`${isSaved ? 'text-yellow-500' : 'text-white'} hover:text-yellow-500 transition-colors duration-300`}
          >
            <Bookmark size={24} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>
        
        {/* Description */}
        <div className="p-4">
          <p className="text-white mb-2">{activeProject?.description}</p>
          <p className="text-gray-400 text-sm">{activeProject?.details}</p>
        </div>
        
        {/* Technologies */}
        {activeProject?.technologies && (
          <div className="p-4 border-t border-gray-700">
            <h4 className="text-sm font-semibold text-gray-400 mb-2">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {activeProject.technologies.map((tech, index) => (
                <span key={index} className="px-2 py-1 bg-gray-700 text-purple-300 rounded-full text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* GitHub link */}
        <div className="p-4 border-t border-gray-700">
          <a 
            href={activeProject?.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-full text-white transition-colors duration-300"
          >
            <ExternalLink size={18} className="mr-2" />
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;