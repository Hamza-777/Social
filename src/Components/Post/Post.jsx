import React from 'react';
import { Link } from 'react-router-dom';
import './Post.css';
import { FiHeart } from 'react-icons/fi';
import { BiComment } from 'react-icons/bi';
import { FaTrashAlt } from 'react-icons/fa';
import { BsStar } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAPost } from '../../Reducers/postReducer';

const Post = ({
  post: {
    _id,
    userAvatar,
    username,
    createdAt,
    image,
    likes: { likeCount },
    content,
    byUser,
  },
}) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const deletePost = (e) => {
    dispatch(deleteAPost(_id));
  };

  return (
    <div className='posts-item'>
      <Link to={`/profile/${byUser}`}>
        <div className='profile-img'>
          <img src={userAvatar} alt={username} className='round-img' />
        </div>
      </Link>
      <div className='main-content'>
        <div className='posts-item-head'>
          <div>
            <h3 className='lead'>{username}</h3>
            <span>{createdAt}</span>
          </div>
        </div>
        <div className='posts-item-info'>
          <p className='h5 post-content'>{content}</p>
          {image && (
            <div className='post-img'>
              <img src={image} alt='postimg' />
            </div>
          )}
        </div>
        <div className='posts-item-actions'>
          <div className='like-dislike-comment'>
            <div className='likes flex-center'>
              <FiHeart className='icon' /> <p className='h5'>{likeCount}</p>
            </div>
            <div className='comment-count flex-center'>
              <Link to={`/post/${_id}`}>
                <BiComment className='icon' />
              </Link>{' '}
              <p className='h5'>0</p>
            </div>
            <div className='star'>
              <BsStar className='icon' />
            </div>
          </div>
          {currentUser.username === username && (
            <FaTrashAlt className='icon delete' onClick={deletePost} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
