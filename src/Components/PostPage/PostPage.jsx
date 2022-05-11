import React from 'react';
import './PostPage.css';
import Post from '../Post/Post';

const PostPage = () => {
  return (
    <section
      class='container'
      style={{ border: '2px solid', borderRadius: '7px' }}
    >
      <Post />
      <div class='create-post'>
        <div class='post-form'>
          <form class='form my-1'>
            <div class='form-group'>
              <textarea
                name='text'
                cols='30'
                rows='3'
                placeholder='comment here...'
                required
              ></textarea>
            </div>
            <button class='btn btn-outline'>Comment</button>
          </form>
        </div>
      </div>
      <div class='comments'>
        <Post comment={true} />
      </div>
    </section>
  );
};

export default PostPage;
