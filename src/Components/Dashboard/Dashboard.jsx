import React, { useEffect } from 'react';
import './Dashboard.css';
import Post from '../Post/Post';
import PostForm from '../PostForm/PostForm';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from '../../Reducers/postReducer';
import Spinner from '../Spinner/Spinner';
import { getAllStarred } from '../../Reducers/userReducer';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllStarred());
  }, [dispatch]);

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
          <p className='large'>No posts to show</p>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
