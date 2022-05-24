import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Post from '../Post/Post';
import User from '../User/User';
import './Search.css';
import Spinner from '../Spinner/Spinner';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { posts } = useSelector((state) => state.post);
  const { users, loading } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.auth);

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className='container'>
      <input
        type='search'
        placeholder='Search for anything'
        className='searchbar'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className='post-items'>
        {searchQuery ? (
          searchQuery[0] === '@' ? (
            users &&
            users
              .filter(
                (user) =>
                  user.username?.includes(searchQuery) &&
                  currentUser._id !== user._id
              )
              .map((user) => <User key={user._id} user={user} />)
          ) : (
            posts &&
            posts
              .filter((post) =>
                post.content?.toLowerCase().includes(searchQuery)
              )
              .map((post) => <Post key={post._id} post={post} />)
          )
        ) : (
          <div className='flex-center flex-col' style={{ gap: '1rem' }}>
            <p className='large flex-center'>Search for a user or a post</p>
            <img
              src='https://cdn.dribbble.com/users/21546/screenshots/4815369/yelp_emptystates_business.gif'
              alt='not found'
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Search;
