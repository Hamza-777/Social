import React from 'react';
import './PostPage.css';
import Post from '../Post/Post';

const PostPage = () => {
  return (
    <section
      className='container'
      style={{ border: '2px solid', borderRadius: '7px' }}
    >
      <Post />
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
      <div className='comments'>
        <Post comment={true} />
      </div>
    </section>
  );
};

export default PostPage;
