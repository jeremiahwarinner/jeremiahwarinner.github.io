import React, { useState } from 'react';
import { X, Loader } from 'lucide-react';

const apiKey = process.env.REACT_APP_API_KEY;

const CreateBlogPost = ({ onClose, onPostCreated }) => {
  const [postName, setPostName] = useState('');
  const [postContent, setPostContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!postName.trim() || !postContent.trim()) {
      setError('Post name and content are required.');
      setIsSubmitting(false);
      return;
    }

    const newPost = {
      postName: postName.trim(),
      postContent: postContent.trim()
    };

    try {
      const response = await fetch('https://portfolio-blog-backend-aaa66fdc9469.herokuapp.com/make_posts', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const createdPost = await response.json();
      onPostCreated(createdPost);
      onClose();
    } catch (error) {
      console.error('Error creating post:', error);
      setError(`Failed to create post: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Create New Blog Post</h2>
          <button 
            onClick={onClose} 
            className="text-gray-600 hover:text-gray-800 transition-colors"
            aria-label="Close"
          >
            <X size={28} />
          </button>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="postName" className="block text-lg font-medium text-gray-700 mb-2">
              Post Name
            </label>
            <input
              type="text"
              id="postName"
              value={postName}
              onChange={(e) => setPostName(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-800 text-lg py-3 px-4"
              required
            />
          </div>
          <div>
            <label htmlFor="postContent" className="block text-lg font-medium text-gray-700 mb-2">
              Post Content
            </label>
            <textarea
              id="postContent"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              rows="8"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-800 text-lg py-3 px-4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors text-lg font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" />
                Creating...
              </span>
            ) : (
              'Create Post'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogPost;