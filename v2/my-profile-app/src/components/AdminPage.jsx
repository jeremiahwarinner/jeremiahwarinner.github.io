import React, { useState } from 'react';
import CreateBlogPost from './CreateBlogPost';

const AdminPage = ({ onLogout }) => {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  const openCreatePostModal = () => {
    setIsCreatePostModalOpen(true);
  };

  const closeCreatePostModal = () => {
    setIsCreatePostModalOpen(false);
  };

  const handlePostCreated = () => {
    // You might want to add some feedback here
    closeCreatePostModal();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
              <button
                onClick={onLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p>Welcome to the admin dashboard. Here you can manage your blog posts.</p>
                <div className="flex justify-center">
                  <button
                    onClick={openCreatePostModal}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Create New Blog Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isCreatePostModalOpen && (
        <CreateBlogPost
          onClose={closeCreatePostModal}
          onPostCreated={handlePostCreated}
        />
      )}
    </div>
  );
};

export default AdminPage;