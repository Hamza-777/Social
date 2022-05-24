import React from 'react';
import './Sidebar.css';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { FaRegUserCircle, FaWpexplorer } from 'react-icons/fa';
import { BsSearch, BsStar } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const location = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.auth);

  return (
    location !== '/login' &&
    location !== '/signup' && (
      <div className='sidebar flex-center flex-col'>
        <Link to='/'>
          <MdOutlineSpaceDashboard className='icon' />
        </Link>
        <Link to='/explore'>
          <FaWpexplorer className='icon' />
        </Link>
        <Link to={`/profile/${currentUser?._id}`}>
          <FaRegUserCircle className='icon' />
        </Link>
        <Link to={`/starred`}>
          <BsStar className='icon' />
        </Link>
        <Link to='/search'>
          <BsSearch className='icon' />
        </Link>
      </div>
    )
  );
};

export default Sidebar;
