import React, { useState, useEffect } from 'react';
import './PostPage.css';
import Post from '../Post/Post';
import { FiFilter } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';
import { GiSandsOfTime } from 'react-icons/gi';
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';
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
  const [sortBy, setSortBy] = useState('latest');
  const [sortedComments, setSortedComments] = useState(null);
  const [voted, setVoted] = useState(null);

  useEffect(() => {
    dispatch(getAllComments(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    setText(comment ? comment.text : '');
  }, [comment]);

  useEffect(() => {
    setSortedComments([...comments]);
  }, [comments]);

  useEffect(() => {
    sortedComments &&
      (sortBy === 'upvotes'
        ? setVoted(
            sortedComments.sort(
              (a, b) => +b.votes.upvotedBy.length - +a.votes.upvotedBy.length
            )
          )
        : sortBy === 'downvotes' &&
          setVoted(
            sortedComments.sort(
              (a, b) =>
                +b.votes.downvotedBy.length - +a.votes.downvotedBy.length
            )
          ));
  }, [sortBy, sortedComments]);

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
      <aside className='filter-options flex-center justify-start'>
        <FiFilter className='icon' />
        <IoIosArrowForward id='arrow' className='icon' />
        <article className='choose flex-center'>
          <p
            className={`current-filter h5 flex-center ${
              sortBy === 'latest' && 'brown'
            }`}
            onClick={(e) => setSortBy('latest')}
          >
            {' '}
            <GiSandsOfTime className='icon' /> Sort By Latest
          </p>
          <p
            className={`current-filter h5 flex-center ${
              sortBy === 'upvotes' && 'red'
            }`}
            onClick={(e) => setSortBy('upvotes')}
          >
            {' '}
            <BiUpArrow className='icon' /> Sort By Most Upvotes
          </p>
          <p
            className={`current-filter h5 flex-center ${
              sortBy === 'downvotes' && 'blue'
            }`}
            onClick={(e) => setSortBy('downvotes')}
          >
            {' '}
            <BiDownArrow className='icon' /> Sort By Most Downvotes
          </p>
        </article>
      </aside>
      <div className='comments'>
        {comments && comments.length > 0 ? (
          sortBy === 'latest' ? (
            comments.map((comment) => (
              <Comment key={comment._id} comment={comment} postId={postId} />
            ))
          ) : (
            sortedComments &&
            voted &&
            sortedComments.map((comment) => (
              <Comment key={comment._id} comment={comment} postId={postId} />
            ))
          )
        ) : (
          <p className='h2 flex-center'>No comments on this post</p>
        )}
      </div>
    </section>
  );
};

export default PostPage;
