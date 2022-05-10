import React from 'react';
import { Link } from 'react-router-dom';
import './Post.css';
import { FiHeart } from 'react-icons/fi';
import { BiComment } from 'react-icons/bi';
import { FaTrashAlt } from 'react-icons/fa';
import { BsStar } from 'react-icons/bs';

const Post = ({ comment = false }) => {
  return (
    <Link to='/post' className='posts-item'>
      <Link to='/profile'>
        <div className='profile-img'>
          <img
            src='https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg'
            alt=''
            className='round-img'
          />
        </div>
      </Link>
      <div>
        <div className='posts-item-head'>
          <div>
            <h3 className='lead'>Hamza Rarani</h3>
            <span>9:30pm 14/11/2021</span>
          </div>
        </div>
        <div className='posts-item-info'>
          <p className='h5 post-content'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem
            ratione, porro odio sequi possimus quasi provident rem itaque optio
            corrupti veniam eligendi dolores maxime commodi placeat ipsam
            architecto, perferendis delectus.
          </p>
          {!comment && (
            <div className='post-img'>
              <img
                src='https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg'
                alt=''
              />
            </div>
          )}
        </div>
        <div className='posts-item-actions'>
          <div className='like-dislike-comment'>
            <div className='likes flex-center'>
              <FiHeart className='icon' /> <p className='h5'>2</p>
            </div>
            {!comment && (
              <div className='comment-count flex-center'>
                <Link to='/post'>
                  <BiComment className='icon' />
                </Link>{' '}
                <p className='h5'>2</p>
              </div>
            )}
            {!comment && (
              <div className='star'>
                <BsStar className='icon' />
              </div>
            )}
          </div>
          <FaTrashAlt className='icon delete' />
        </div>
      </div>
    </Link>
  );
};

export default Post;
