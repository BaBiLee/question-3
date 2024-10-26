import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../features/posts/postSlice';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-semibold mb-4'>Posts</h2>
      {postStatus === 'loading' && <p className='text-gray-500'>Loading...</p>}
      {postStatus === 'succeeded' && (
        <div className="overflow-x-auto">
          <table className='min-w-full bg-white border border-gray-200 rounded-lg shadow-md'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  Title
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  Body
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {posts.map((post, index) => (
                <tr key={index} className="cursor-pointer hover:bg-gray-100 transition duration-150">
                  <td
                    className='px-6 py-4 text-lg text-gray-700 truncate max-w-36'
                    data-tooltip-id={`titleTooltip-${index}`}
                    data-tooltip-content={post.title}
                  >
                    {post.title}
                  </td>
                  <td
                    className='px-6 py-4 text-lg text-gray-700 truncate max-w-xs'
                    data-tooltip-id={`bodyTooltip-${index}`}
                    data-tooltip-content={post.body}
                  >
                    {post.body}
                  </td>
                  <ReactTooltip id={`titleTooltip-${index}`} place="top" effect="solid" />
                  <ReactTooltip id={`bodyTooltip-${index}`} place="top" effect="solid" />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PostList;
