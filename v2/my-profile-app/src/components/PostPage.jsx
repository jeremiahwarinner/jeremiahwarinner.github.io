import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import CustomCursor from './CustomCursor';
const apiKey = process.env.REACT_APP_API_KEY;
const PostPage = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://portfolio-blog-backend-aaa66fdc9469.herokuapp.com/get_post/${id}`, {
          method: 'GET', // Specify the request method
          headers: {
            'x-api-key': apiKey, // Add your API key here
            'Content-Type': 'application/json', // Set content type (if necessary)
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <div className="text-purple-300">Not Found</div>;
  }

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 overflow-auto">
        <CustomCursor/>
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-purple-300">{post.postName}</h1>
        <ReactMarkdown className="prose prose-lg prose-invert prose-purple">
          {post.postContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default PostPage;