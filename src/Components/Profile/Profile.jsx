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
import { GrEdit } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  return (
    <section className='container'>
      <div className='myprofile'>
        <FaTrashAlt className='icon delete-profile' />
        <Link to='/edit-profile'>
          <GrEdit className='icon edit-profile' />
        </Link>
        <div className='myprofile-pic flex-center flex-col'>
          <Link to='/profile'>
            <div className='profile-img flex-center'>
              <img
                src='https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg'
                alt='profile'
                className='round-img'
              />
            </div>
          </Link>
          <p className='large'>Hamza Rarani</p>
          <p className='lead'>An aspiring full stack web developer</p>
        </div>
        <div className='myprofile-socials'>
          <a href='!#'>
            <FaRegEnvelope className='icon fa-envelope' />
          </a>
          <a href='!#'>
            <FaTwitter className='icon fa-twitter' />
          </a>
          <a href='!#'>
            <FaFacebook className='icon fa-facebook' />
          </a>
          <a href='!#'>
            <FaYoutube className='icon fa-youtube' />
          </a>
          <a href='!#'>
            <FaLinkedin className='icon fa-linkedin' />
          </a>
          <a href='!#'>
            <FaInstagram className='icon fa-instagram' />
          </a>
          <a href='!#'>
            <FaGlobe className='icon fa-globe' />
          </a>
        </div>
        <hr className='hr' />
        <div className='myprofile-dates'>
          <p className='message-text'>
            <span>Joined on</span>: 24/10/2021
          </p>
          <p className='message-text'>
            <span>Location</span>: Maharashtra, India
          </p>
          <p className='message-text'>
            <span>Date of Birth</span>: 07/10/2000
          </p>
        </div>
        <hr className='hr' />
        <div className='myprofile-about'>
          <p className='large'>About Me</p>
          <p className='lead'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
            impedit ullam cumque earum reiciendis esse accusamus soluta
            similique maiores beatae nostrum, sit quas. Nobis odit quam aut
            sapiente a! Totam. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Odio possimus consectetur officia praesentium id
            omnis molestias suscipit eum accusamus adipisci enim doloremque,
            ipsum eligendi itaque iste deleniti dolor reiciendis aliquam? Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            praesentium quia repellat voluptatum similique deserunt nemo culpa
            non, necessitatibus voluptatem eveniet consequuntur nihil rem
            exercitationem labore deleniti laborum explicabo sunt.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
