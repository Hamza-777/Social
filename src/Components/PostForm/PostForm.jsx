import React, { useState } from 'react';
import { GrGallery } from 'react-icons/gr';
import { useSelector, useDispatch } from 'react-redux';
import { createAPost } from '../../Reducers/postReducer';
import './PostForm.css';

const PostForm = () => {
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createAPost({
        content,
        image,
        userAvatar: user.avatar,
      })
    );
    setImage('');
    setContent('');
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className='create-post'>
      <div className='post-form'>
        <form className='form' onSubmit={submitHandler}>
          <div className='form-group'>
            <textarea
              name='content'
              cols='30'
              rows='5'
              placeholder='Create a post'
              value={content}
              onChange={handleContent}
              required
            ></textarea>
          </div>
          {image ? (
            <div className='preview'>
              <img src={image} alt='preview' />
            </div>
          ) : (
            ''
          )}
          <div className='form-group form-controls flex-center justify-between'>
            <div className='photo'>
              <label htmlFor='img'>
                <GrGallery className='icon' />
              </label>
              <input
                type='file'
                id='img'
                name='img'
                accept='image/*'
                onChange={handleImage}
              />
            </div>
            <button className='btn btn-outline' value='Post'>
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
