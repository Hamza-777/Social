import React from 'react';
import Post from '../Post/Post';
import { useSelector } from 'react-redux';

const Starred = () => {
  const { starred } = useSelector((state) => state.user);

  return (
    <section className='container'>
      <div className='posts'>
        {starred && starred.length > 0 ? (
          starred.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <p className='large'>No posts to show</p>
        )}
      </div>
    </section>
  );
};

export default Starred;
