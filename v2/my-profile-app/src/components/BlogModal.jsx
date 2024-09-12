import React, { useState, useRef, useMemo } from 'react';
import { ChevronLeft, Search } from 'lucide-react';

// Array of emoji Unicode characters
const emojis = [
  '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
  '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
  '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
  '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
  '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
  '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗',
  '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯',
  '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐',
  '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈',
  '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾',
  '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿',
  '😾', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨',
  '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒',
  '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇',
  '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜',
];

const getRandomEmoji = () => {
  return emojis[Math.floor(Math.random() * emojis.length)];
};

const BlogModal = ({ isZooming, closeBlogModal, blogPosts, setIsCreatePostModalOpen }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const blogModalRef = useRef(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getFilteredAndSortedBlogPosts = () => {
    return blogPosts
      .filter(post => {
        const postTitle = post.postName || post.title || '';
        const postDate = formatDate(post.Date);
        const searchLower = searchTerm.toLowerCase();

        return postTitle.toLowerCase().includes(searchLower) ||
               postDate.toLowerCase().includes(searchLower);
      })
      .sort((a, b) => {
        const dateA = new Date(a.Date || 0);
        const dateB = new Date(b.Date || 0);
        return dateB - dateA; // Sort in descending order (newer first)
      });
  };

  const filteredAndSortedBlogPosts = getFilteredAndSortedBlogPosts();

  const handlePostClick = (post) => {
    window.open(`/post/${post.id}`, '_blank');
  };

  const postEmojis = useMemo(() => {
    return blogPosts.reduce((acc, post) => {
      acc[post.id] = getRandomEmoji();
      return acc;
    }, {});
  }, [blogPosts]);

  return (
    <div
      ref={blogModalRef}
      className={`fixed top-0 left-0 w-full h-full bg-gray-900 z-50 overflow-auto transition-all duration-500 ease-in-out ${
        isZooming ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center">
          <button onClick={closeBlogModal} className="mr-2 text-purple-400 hover:text-purple-300">
            <ChevronLeft />
          </button>
          <h2 className="font-semibold text-purple-300">Blog Posts</h2>
        </div>
      </div>
      <div className="p-4">
        <div className="bg-gray-800 rounded-full p-2 mb-4 flex items-center">
          <Search className="text-gray-400 mr-2" size={16} />
          <input
            type="text"
            placeholder="Search posts by title or date"
            className="bg-transparent w-full outline-none text-sm text-gray-300"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="space-y-4 transition-all duration-300">
          {filteredAndSortedBlogPosts.map((post) => (
            <div
              key={post.id}
              className="flex items-center p-3 bg-gray-800 rounded-lg transition-all duration-300 hover:bg-gray-700 cursor-pointer"
              onClick={() => handlePostClick(post)}
            >
              <div className="w-12 h-12 bg-gray-700 rounded-full mr-3 flex-shrink-0 flex items-center justify-center text-2xl">
                {postEmojis[post.id]}
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-purple-300">{post.postName || post.title}</h3>
                <p className="text-gray-400 text-sm">{formatDate(post.Date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogModal;