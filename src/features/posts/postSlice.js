import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
// Fetch posts from the API
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Add a new post to the API
// Add a new post to the API
export const addPost = createAsyncThunk('posts/addPost', async (newPost, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
    
    // Move the toast success notification here
    toast.success("Successfully");
    
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Create the posts slice
const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle pending state for fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Handle fulfilled state for fetchPosts
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      // Handle rejected state for fetchPosts
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle fulfilled state for addPost
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      // Handle rejected state for addPost
      .addCase(addPost.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Export the reducer
export default postSlice.reducer;
