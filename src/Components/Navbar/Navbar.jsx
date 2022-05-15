import React, { useEffect } from 'react';
import { FiLink } from 'react-icons/fi';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Reducers/authReducer';
import './Navbar.css';
import { successPopup } from '../../Misc/toasts';
import { getAllPosts } from '../../Reducers/postReducer';
import { getAllStarred } from '../../Reducers/userReducer';

const Navbar = () => {
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const { userLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!location.includes('/post/')) {
      dispatch(getAllPosts());
      dispatch(getAllStarred());
    }
  }, [dispatch, location]);

  const logoutUser = (e) => {
    dispatch(logout());
    successPopup('Logged Out successfully!', 'light');
    return <Navigate to='/login' />;
  };

  return (
    <nav className='nav flex-center justify-between'>
      <Link to='/' className='nav-left logo flex-center'>
        <FiLink className='h2' />
        <p className='h2'>SOCIAL</p>
      </Link>
      <div className='nav-right flex-center'>
        {userLoggedIn ? (
          <button
            className='btn btn-outline flex flex-col align-center'
            onClick={logoutUser}
          >
            <AiOutlineLogout className='icon' />
          </button>
        ) : (
          <Link
            to='/login'
            className='btn btn-outline flex flex-col align-center'
          >
            <AiOutlineLogin className='icon' />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
