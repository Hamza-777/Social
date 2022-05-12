import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../../Reducers/authReducer';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const { userLoggedIn } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const logInUser = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  const loginAsGuest = () => {
    setFormData({
      ...formData,
      email: 'guest@gmail.com',
      password: 'guest777',
    });
    dispatch(
      login({
        email: 'guest@gmail.com',
        password: 'guest777',
      })
    );
  };

  if (userLoggedIn) {
    return <Navigate to='/' />;
  }

  return (
    <section className='container' id='login-form'>
      <p className='h3' style={{ textAlign: 'center' }}>
        LOGIN
      </p>
      <form className='form' onSubmit={logInUser}>
        <div className='form-group'>
          <input
            type='email'
            name='email'
            placeholder='Your Email'
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            name='password'
            placeholder='Your Password'
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div className='buttons flex-center flex-col'>
          <button className='btn btn-submit'>Login</button>
          <button
            type='button'
            className='btn btn-submit'
            onClick={loginAsGuest}
          >
            Login with guest credentials
          </button>
          <button type='button' className='btn btn-link'>
            Don't have an account? <Link to='/signup'>Create Account</Link>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
