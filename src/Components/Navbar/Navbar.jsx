import React from 'react';
import { FiLink } from 'react-icons/fi';
import { AiOutlineLogin } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className='nav flex-center justify-between'>
      <Link to='/' className='nav-left logo flex-center'>
        <FiLink className='h2' />
        <p className='h2'>SOCIAL</p>
      </Link>
      <div className='nav-right flex-center'>
        <Link
          to='/login'
          className='btn btn-outline flex flex-col align-center'
        >
          <AiOutlineLogin className='icon' />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
