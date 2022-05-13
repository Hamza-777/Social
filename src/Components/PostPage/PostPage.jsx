import React, { useEffect } from 'react';
import './PostPage.css';
import Post from '../Post/Post';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAPost } from '../../Reducers/postReducer';
import Spinner from '../Spinner/Spinner';

const PostPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { post, loading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAPost(postId));
  }, [dispatch, postId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <section
      className='container'
      style={{ border: '2px solid', borderRadius: '7px' }}
    >
      {post && <Post post={post} />}
      <div className='create-post'>
        <div className='post-form'>
          <form className='form my-1'>
            <div className='form-group'>
              <textarea
                name='text'
                cols='30'
                rows='3'
                placeholder='comment here...'
                required
              ></textarea>
            </div>
            <button className='btn btn-outline'>Comment</button>
          </form>
        </div>
      </div>
      <div className='comments'></div>
    </section>
  );
};

export default PostPage;
