import React, { useState, useEffect } from 'react';
import './PostPage.css';
import Post from '../Post/Post';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import {
  createAComment,
  editAComment,
  getAllComments,
} from '../../Reducers/commentReducer';
import Comment from '../Comment/Comment';

const PostPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { posts, loading } = useSelector((state) => state.post);
  const { comment, comments } = useSelector((state) => state.comment);
  const [text, setText] = useState('');

  useEffect(() => {
    dispatch(getAllComments(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    setText(comment ? comment.text : '');
  }, [comment]);

  const addComment = (e) => {
    e.preventDefault();
    comment
      ? dispatch(
          editAComment({
            comment: {
              text,
            },
            postId,
            commentId: comment._id,
          })
        )
      : dispatch(
          createAComment({
            comment: {
              text,
              byUser: currentUser._id,
              userAvatar: currentUser.avatar,
            },
            id: postId,
          })
        );
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <section
      className='container'
      style={{ border: '2px solid var(--grey-9-color)', borderRadius: '7px' }}
    >
      {posts && posts.length > 0 && (
        <Post post={posts.filter((item) => item._id === postId)[0]} />
      )}
      <div className='create-post'>
        <div className='post-form'>
          <form className='form my-1' onSubmit={addComment}>
            <div className='form-group'>
              <textarea
                name='text'
                cols='30'
                rows='3'
                placeholder='comment here...'
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              ></textarea>
            </div>
            <button className='btn btn-outline'>
              {comment ? 'Edit' : 'Comment'}
            </button>
          </form>
        </div>
      </div>
      <div className='comments'>
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <Comment key={comment._id} comment={comment} postId={postId} />
          ))
        ) : (
          <p className='h2 flex-center'>No comments on this post</p>
        )}
      </div>
    </section>
  );
};

export default PostPage;
