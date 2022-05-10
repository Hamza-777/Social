import React from 'react';
import './Search.css';

const Search = () => {
  return (
    <section className='container'>
      <input
        type='search'
        placeholder='Search for anything'
        className='searchbar'
      />
    </section>
  );
};

export default Search;
