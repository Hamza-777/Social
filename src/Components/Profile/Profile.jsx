import React, { useEffect } from 'react';
import {
  FaRegEnvelope,
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
  FaGlobe,
} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { GrEdit } from 'react-icons/gr';
import { Link, useParams } from 'react-router-dom';
import {
  followAUser,
  unfollowAUser,
  getAUser,
} from '../../Reducers/userReducer';
import Spinner from '../Spinner/Spinner';
import './Profile.css';

const Profile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAUser(userId));
  }, [dispatch, userId]);

  const followUser = (e) => {
    dispatch(followAUser(userId));
  };

  const unFollowUser = (e) => {
    dispatch(unfollowAUser(userId));
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className='container'>
      {user && (
        <div className='myprofile'>
          {currentUser._id === userId && (
            <Link to={`/edit-profile/${userId}`}>
              <GrEdit className='icon edit-profile' />
            </Link>
          )}
          <div className='myprofile-pic flex-center flex-col'>
            <Link to='/profile'>
              <div className='profile-img flex-center'>
                <img
                  src={user.avatar}
                  alt={user.username}
                  className='round-img'
                />
              </div>
            </Link>
            <p className='large'>{`${
              user.name.charAt(0).toUpperCase() + user.name.slice(1)
            } <${user.username}>`}</p>
            <p className='lead profile-desc'>{user.desc ? user.desc : ''}</p>
          </div>
          <div className='myprofile-socials'>
            <a href='https://mail.google.com/mail/u/0/#inbox?compose=new'>
              <FaRegEnvelope className='icon fa-envelope' />
            </a>
            {user.twitter ? (
              <a href={user.twitter}>
                <FaTwitter className='icon fa-twitter' />
              </a>
            ) : (
              ''
            )}
            {user.facebook ? (
              <a href={user.facebook}>
                <FaFacebook className='icon fa-facebook' />
              </a>
            ) : (
              ''
            )}
            {user.youtube ? (
              <a href={user.youtube}>
                <FaYoutube className='icon fa-youtube' />
              </a>
            ) : (
              ''
            )}
            {user.linkedin ? (
              <a href={user.linkedin}>
                <FaLinkedin className='icon fa-linkedin' />
              </a>
            ) : (
              ''
            )}
            {user.instagram ? (
              <a href={user.instagram}>
                <FaInstagram className='icon fa-instagram' />
              </a>
            ) : (
              ''
            )}
            {user.website ? (
              <a href={user.website}>
                <FaGlobe className='icon fa-globe' />
              </a>
            ) : (
              ''
            )}
          </div>
          <hr className='hr' />
          <div className='myprofile-dates'>
            <p className='message-text'>
              <span>Joined on</span>: {user.createdAt}
            </p>
            {user.location ? (
              <p className='message-text'>
                <span>Location</span>: {user.location ? user.location : ''}
              </p>
            ) : (
              ''
            )}
            <p className='message-text'>
              <span>Date of Birth</span>: {user.dob ? user.dob : '--/--/----'}
            </p>
          </div>
          <hr className='hr' />
          <div className='follow-details flex-center'>
            <div className='message-text'>
              <span>{user.followers.length}</span> followers
            </div>
            <div className='message-text'>
              <span>{user.following.length}</span> following
            </div>
            {currentUser._id !== userId &&
              (user.followers.some((item) => item._id === currentUser._id) ? (
                <button className='btn btn-outline' onClick={unFollowUser}>
                  UnFollow
                </button>
              ) : (
                <button className='btn btn-outline' onClick={followUser}>
                  Follow
                </button>
              ))}
          </div>
          <hr className='hr' />
          {user.about ? (
            <div className='myprofile-about'>
              <p className='large'>About Me</p>
              <p className='lead'>{user.about ? user.about : ''}</p>
            </div>
          ) : (
            ''
          )}
        </div>
      )}
    </section>
  );
};

export default Profile;
