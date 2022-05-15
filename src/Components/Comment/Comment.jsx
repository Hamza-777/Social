import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { GrEdit } from 'react-icons/gr';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAComment, getAComment } from '../../Reducers/commentReducer';

const Comment = ({
  comment: { _id, userAvatar, username, createdAt, text, byUser },
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
