import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import './index.css'
import { ToastContainer } from 'react-toastify';
const App = () => (
  <Provider store={store}>
    <div>
      <h1 className='pt-5 text-center text-blue-500 text-3xl font-bold'>Question 3</h1>
      <PostForm />
      <PostList />
      <ToastContainer autoClose={2000} />
    </div>
  </Provider>
);

export default App;
