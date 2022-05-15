import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { followAUser, unfollowAUser } from '../../Reducers/userReducer';
import './User.css';

const User = ({ user: { _id, avatar, username, followers } }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const followUser = (e) => {
    dispatch(followAUser(_id));
  };

  const unFollowUser = (e) => {
    dispatch(unfollowAUser(_id));
  };

  return (
    <div className='user flex-center justify-between'>
      <div className='user-left flex-center'>
        <Link to={`/profile/${_id}`}>
          <div className='profile-img'>
            <img src={avatar} alt={username} className='round-img' />
          </div>
        </Link>
        <p className='h4'>{username}</p>
      </div>
      <div className='user-right flex-center'>
        {currentUser._id !== _id &&
        followers.some((item) => item._id === currentUser._id) ? (
          <button className='btn btn-outline' onClick={unFollowUser}>
            UnFollow
          </button>
        ) : (
          <button className='btn btn-outline' onClick={followUser}>
            Follow
          </button>
        )}
        <button className='btn btn-outline'>Chat</button>
      </div>
    </div>
  );
};

export default User;
