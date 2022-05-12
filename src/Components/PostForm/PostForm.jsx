import React, { useState } from 'react';
import { GrGallery } from 'react-icons/gr';
import './PostForm.css';

const PostForm = () => {
  const [image, setImage] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    setImage();
  };

  const handleChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className='create-post'>
      <div className='post-form'>
        <form className='form' onSubmit={submitHandler}>
          <div className='form-group'>
            <textarea
              name='text'
              cols='30'
              rows='5'
              placeholder='Create a post'
              required
            ></textarea>
          </div>
          {image ? (
            <div className='preview'>
              <img src={image} alt='preview' />
            </div>
          ) : (
            <div></div>
          )}
          <div className='form-group form-controls flex-center justify-between'>
            <div className='photo'>
              <label htmlFor='file'>
                <GrGallery className='icon' />
              </label>
              <input
                type='file'
                id='file'
                name='file'
                onChange={handleChange}
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
