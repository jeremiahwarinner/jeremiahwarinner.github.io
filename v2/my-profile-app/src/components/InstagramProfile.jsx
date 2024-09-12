import React, { useState, useEffect, useRef } from 'react';
import { Grid, User, FileText } from 'lucide-react';
import ProfileHeader from './ProfileHeader';
import TabNavigation from './TabNavigation';
import ProjectGrid from './ProjectGrid';
import AboutGrid from './AboutGrid';
import BlogModal from './BlogModal';
import ProjectModal from './ProjectModal';
import CreateBlogPost from './CreateBlogPost';
import CustomCursor from './CustomCursor';
import { profileData, projects } from './data';

const InstagramProfile = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [isZooming, setIsZooming] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const apiKey = process.env.REACT_APP_API_KEY;

  const tabRefs = useRef({});

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch('https://portfolio-blog-backend-aaa66fdc9469.herokuapp.com/get_posts', {
        method: 'GET', // Specify the request method
        headers: {
          'x-api-key': apiKey, 
          'Content-Type': 'application/json', // Set content type (if necessary)
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      
      if (Array.isArray(data.posts)) {
        setBlogPosts(data.posts);
      } else if (typeof data === 'object' && data !== null) {
        setBlogPosts(Object.values(data));
      } else {
        console.error('Unexpected data structure:', data);
        setBlogPosts([]);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setBlogPosts([]);
    }
  };

  const handleTabChange = (tab) => {
    setIsTransitioning(true);
    setActiveTab(tab);
    if (tab === 'blog') {
      openBlogModal();
    } else {
      setTimeout(() => setIsTransitioning(false), 150);
    }
  };

  const openBlogModal = () => {
    setIsBlogModalOpen(true);
    setTimeout(() => {
      setIsZooming(true);
    }, 50);
  };

  const closeBlogModal = () => {
    setIsZooming(false);
    setTimeout(() => {
      setIsBlogModalOpen(false);
      setActiveTab('projects');
      setIsTransitioning(false);
    }, 300);
  };

  const openProjectModal = (project) => {
    setActiveProject(project);
    setIsProjectModalOpen(true);
    setTimeout(() => {
      setIsZooming(true);
    }, 50);
  };

  const closeProjectModal = () => {
    setIsZooming(false);
    setTimeout(() => {
      setIsProjectModalOpen(false);
      setActiveProject(null);
    }, 300);
  };

  const handlePostCreated = (newPost) => {
    setBlogPosts(prevPosts => [newPost, ...prevPosts]);
    setIsCreatePostModalOpen(false);
  };

  const tabs = [
    { name: 'PROJECTS', icon: Grid, value: 'projects' },
    { name: 'ABOUT ME', icon: User, value: 'about' },
    { name: 'BLOG', icon: FileText, value: 'blog' },
  ];

  return (
    <div className="max-w-3xl mx-auto p-4 bg-gray-900 text-gray-300">
      <CustomCursor />
      <ProfileHeader profileData={profileData} blogPosts={blogPosts} />

      <TabNavigation 
        tabs={tabs} 
        activeTab={activeTab} 
        handleTabChange={handleTabChange} 
        tabRefs={tabRefs} 
      />

      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {activeTab === 'projects' && (
          <div className="grid grid-cols-3 gap-4">
            <ProjectGrid projects={projects} openProjectModal={openProjectModal} />
          </div>
        )}
        {activeTab === 'about' && <AboutGrid />}
      </div>

      {isBlogModalOpen && (
        <BlogModal 
          isZooming={isZooming}
          closeBlogModal={closeBlogModal}
          blogPosts={blogPosts}
          setIsCreatePostModalOpen={setIsCreatePostModalOpen}
        />
      )}

      {isProjectModalOpen && (
        <ProjectModal 
          isZooming={isZooming}
          closeProjectModal={closeProjectModal}
          activeProject={activeProject}
        />
      )}
      {isCreatePostModalOpen && (
        <CreateBlogPost
          onClose={() => setIsCreatePostModalOpen(false)}
          onPostCreated={handlePostCreated}
        />
      )}
    </div>
  );
};

export default InstagramProfile;