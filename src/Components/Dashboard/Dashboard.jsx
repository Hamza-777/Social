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
          <div className='flex-center'>
            <img
              src='https://cdn.dribbble.com/users/21546/screenshots/4815369/yelp_emptystates_business.gif'
              alt='not found'
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
