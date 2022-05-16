import React from 'react';
import './Dashboard.css';
import Post from '../Post/Post';
import PostForm from '../PostForm/PostForm';
import { useSelector } from 'react-redux';
import Spinner from '../Spinner/Spinner';

const Dashboard = () => {
  const { posts, loading } = useSelector((state) => state.post);

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className='container'>
      <PostForm />
      <div className='posts'>
        {posts && posts.length > 0 ? (
          posts.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <p className='large flex-center'>No posts to show</p>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
