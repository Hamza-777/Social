import React from 'react';
import './Sidebar.css';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { FaRegUserCircle } from 'react-icons/fa';
import { BsSearch, BsChatLeftText } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation().pathname;
  return (
    location !== '/login' &&
    location !== '/signup' && (
      <div className='sidebar flex-center flex-col'>
        <Link to='/'>
          <MdOutlineSpaceDashboard className='icon' />
        </Link>
        <Link to='/profile'>
          <FaRegUserCircle className='icon' />
        </Link>
        <Link to='/search'>
          <BsSearch className='icon' />
        </Link>
        <Link to='/chat'>
          <BsChatLeftText className='icon' />
        </Link>
      </div>
    )
  );
};

export default Sidebar;
