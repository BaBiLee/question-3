import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../features/posts/postSlice';

const PostForm = () => {
  const [formData, setFormData] = useState({ title: '', body: '' });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost(formData));
    setFormData({ title: '', body: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-center">Add New Post</h2>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="mb-4 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="body"
        value={formData.body}
        onChange={handleChange}
        placeholder="Body"
        required
        className="mb-4 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="4"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-150"
      >
        Add Post
      </button>
    </form>
  );
};

export default PostForm;