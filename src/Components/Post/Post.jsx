import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Post.css';
import { FiHeart } from 'react-icons/fi';
import { BiComment } from 'react-icons/bi';
import { FaTrashAlt, FaHeart } from 'react-icons/fa';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { GrEdit } from 'react-icons/gr';
import { useSelector, useDispatch } from 'react-redux';
import {
  likeAPost,
  dislikeAPost,
  deleteAPost,
  getAPost,
} from '../../Reducers/postReducer';
import { starAPost, unstarAPost } from '../../Reducers/userReducer';

const Post = ({
  post: {
    _id,
    userAvatar,
    username,
    createdAt,
    image,
    likes: { likeCount, likedBy, dislikedBy },
    comments,
    content,
    byUser,
  },
}) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { starred } = useSelector((state) => state.user);
  const location = useLocation().pathname;

  const starPost = (e) => {
    dispatch(starAPost(_id));
  };

  const unstarPost = (e) => {
    dispatch(unstarAPost(_id));
  };

  const likePost = (e) => {
    dispatch(likeAPost(_id));
  };

  const dislikePost = (e) => {
    dispatch(dislikeAPost(_id));
  };

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
              {likedBy.length !== 0 &&
              likedBy.some((item) => item._id === currentUser._id) ? (
                <FaHeart className='icon' onClick={dislikePost} />
              ) : (
                <FiHeart className='icon' onClick={likePost} />
              )}{' '}
              <p className='h5'>{likeCount}</p>
            </div>
            <div className='comment-count flex-center'>
              <Link to={`/post/${_id}`}>
                <BiComment className='icon' />
              </Link>{' '}
              <p className='h5'>{comments && comments.length}</p>
            </div>
            <div className='star'>
              {starred && starred.some((item) => item._id === _id) ? (
                <BsStarFill className='icon' onClick={unstarPost} />
              ) : (
                <BsStar className='icon' onClick={starPost} />
              )}
            </div>
          </div>

          {currentUser.username === username && !location.includes('/post/') && (
            <div className='edit-delete flex-center'>
              <FaTrashAlt className='icon delete' onClick={deletePost} />
              <GrEdit
                className='icon'
                onClick={(e) => dispatch(getAPost(_id))}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
