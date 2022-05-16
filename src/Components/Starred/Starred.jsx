import React, { useEffect } from 'react';
import Post from '../Post/Post';
import { useSelector, useDispatch } from 'react-redux';
import { getAllStarred } from '../../Reducers/userReducer';

const Starred = () => {
  const dispatch = useDispatch();
  const { starred } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllStarred());
  }, [dispatch, posts]);

  return (
    <section className='container'>
      <div className='posts'>
        {starred && starred.length > 0 ? (
          starred.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <p className='large flex-center'>No posts to show</p>
        )}
      </div>
    </section>
  );
};

export default Starred;
