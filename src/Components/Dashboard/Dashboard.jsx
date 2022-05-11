import React from 'react';
import './Dashboard.css';
import Post from '../Post/Post';
import PostForm from '../PostForm/PostForm';

const Dashboard = () => {
  return (
    <section className='container'>
      <PostForm />
      <div className='posts'>
        <Post />
        <Post />
      </div>
    </section>
  );
};

export default Dashboard;
