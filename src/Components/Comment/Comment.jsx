import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { GrEdit } from 'react-icons/gr';
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import {
  upvoteAComment,
  downvoteAComment,
  deleteAComment,
  getAComment,
} from '../../Reducers/commentReducer';

const Comment = ({
  comment: {
    _id,
    userAvatar,
    username,
    createdAt,
    text,
    byUser,
    votes: { upvotedBy, downvotedBy },
  },
  postId,
}) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const deleteComment = (e) => {
    dispatch(
      deleteAComment({
        postId,
        commentId: _id,
      })
    );
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
          <p className='h5 post-content'>{text}</p>
        </div>
        <div className='posts-item-actions'>
          <div className='like-dislike-comment'>
            <div className='likes flex-center'>
              <button
                className='btn btn-link flex-center'
                onClick={(e) =>
                  dispatch(upvoteAComment({ postId, commentId: _id }))
                }
                disabled={
                  upvotedBy &&
                  upvotedBy.length > 0 &&
                  upvotedBy.some((item) => item._id === currentUser._id)
                    ? true
                    : false
                }
              >
                <BiUpArrow className='icon' />
              </button>
              <p className='h5'>{upvotedBy?.length}</p>
            </div>
            <div className='comment-count flex-center'>
              <button
                className='btn btn-link flex-center'
                onClick={(e) =>
                  dispatch(downvoteAComment({ postId, commentId: _id }))
                }
                disabled={
                  downvotedBy &&
                  downvotedBy.length > 0 &&
                  downvotedBy.some((item) => item._id === currentUser._id)
                    ? true
                    : false
                }
              >
                <BiDownArrow className='icon' />
              </button>
              <p className='h5'>{downvotedBy?.length}</p>
            </div>
          </div>
          {currentUser.username === username && (
            <div className='edit-delete-comment flex-center'>
              <FaTrashAlt className='icon delete' onClick={deleteComment} />
              <GrEdit
                className='icon'
                onClick={(e) =>
                  dispatch(getAComment({ postId, commentId: _id }))
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
