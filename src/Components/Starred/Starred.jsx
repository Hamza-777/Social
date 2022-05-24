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

export default Starred;
