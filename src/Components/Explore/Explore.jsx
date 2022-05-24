import React, { useState, useEffect } from 'react';
import Post from '../Post/Post';
import { FiFilter } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { GiSandsOfTime } from 'react-icons/gi';
import { BiComment } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import './Explore.css';

const Explore = () => {
  const { posts, loading } = useSelector((state) => state.post);
  const [sortBy, setSortBy] = useState('latest');
  const [sortedPosts, setSortedPosts] = useState([...posts]);

  useEffect(() => {
    setSortedPosts([...posts]);
  }, [posts]);

  if (sortBy === 'liked') {
    sortedPosts.sort((a, b) => +b.likes.likeCount - +a.likes.likeCount);
  } else {
    sortedPosts.sort((a, b) => +b.comments.length - +a.comments.length);
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className='container'>
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
            <GiSandsOfTime className='icon' /> Latest
          </p>
          <p
            className={`current-filter h5 flex-center ${
              sortBy === 'liked' && 'red'
            }`}
            onClick={(e) => setSortBy('liked')}
          >
            {' '}
            <FaHeart className='icon' /> Most Likes
          </p>
          <p
            className={`current-filter h5 flex-center ${
              sortBy === 'comment' && 'blue'
            }`}
            onClick={(e) => setSortBy('comment')}
          >
            {' '}
            <BiComment className='icon' /> Most Comments
          </p>
        </article>
      </aside>
      <div className='posts'>
        {posts && posts.length > 0 ? (
          sortBy === 'latest' ? (
            posts.map((post) => <Post key={post._id} post={post} />)
          ) : (
            sortedPosts &&
            sortedPosts.length > 0 &&
            sortedPosts.map((post) => <Post key={post._id} post={post} />)
          )
        ) : (
          <p className='large flex-center'>No posts to show</p>
        )}
      </div>
    </section>
  );
};

export default Explore;
