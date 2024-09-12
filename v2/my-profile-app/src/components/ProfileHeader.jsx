import React from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';

const ProfileHeader = ({ profileData = {}, blogPosts }) => {
  const totalPosts = blogPosts && Array.isArray(blogPosts) ? blogPosts.length : 0;

  return (
    <header className="flex items-center mb-8">
      <div className="w-20 h-20 rounded-full bg-purple-600 mr-8 overflow-hidden">
        <img 
          src="/profile.jpg" 
          alt={profileData.username || 'User'} 
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-2 text-white">{profileData.username || 'User'}</h1>
        <div className="flex space-x-4 mb-2">
          <span><strong className="text-purple-400">{totalPosts}</strong> posts</span>
        </div>
        <div className="font-medium text-sm italic mb-2 text-gray-400">{profileData.quote || ''}</div>
        <div className="flex space-x-4">
          {profileData.linkedin && (
            <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
              <Linkedin size={20} />
            </a>
          )}
          {profileData.github && (
            <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
              <Github size={20} />
            </a>
          )}
          {profileData.email && (
            <a href={`mailto:${profileData.email}`} className="text-purple-400 hover:text-purple-300">
              <Mail size={20} />
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;