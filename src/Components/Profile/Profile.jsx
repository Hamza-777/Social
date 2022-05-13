import React from 'react';
import {
  FaTrashAlt,
  FaRegEnvelope,
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
  FaGlobe,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { GrEdit } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <section className='container'>
      <div className='myprofile'>
        {/* <FaTrashAlt className='icon delete-profile' /> */}
        <Link to='/edit-profile'>
          <GrEdit className='icon edit-profile' />
        </Link>
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
          <p className='lead'>{user.desc ? user.desc : ''}</p>
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
        {user.about ? (
          <div className='myprofile-about'>
            <p className='large'>About Me</p>
            <p className='lead'>{user.about ? user.about : ''}</p>
          </div>
        ) : (
          ''
        )}
      </div>
    </section>
  );
};

export default Profile;
