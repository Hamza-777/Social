import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signup, reset } from '../../Reducers/authReducer';
import { errorPopup } from '../../Misc/toasts';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

  const dispatch = useDispatch();
  const { userLoggedIn } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const signUpUser = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      errorPopup('Passwords do not match!', 'light');
      setFormData({ ...formData, password: '', confirmPassword: '' });
    } else {
      const userData = {
        username: '@' + email.split('@')[0],
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt-F5GQg8qB2fWquF1ltQvAT2Z8Dv5pJLb9w&usqp=CAU',
        name,
        email,
        password,
      };

      dispatch(signup(userData));
    }
  };

  if (userLoggedIn) {
    return <Navigate to='/' />;
  }

  return (
    <section className='container' id='login-form'>
      <p className='h3' style={{ textAlign: 'center' }}>
        SIGNUP
      </p>
      <form className='form' onSubmit={signUpUser}>
        <div className='form-group'>
          <input
            type='text'
            name='name'
            placeholder='Enter Name'
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            name='email'
            placeholder='Enter Email'
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            name='password'
            placeholder='Enter Password'
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            name='confirmPassword'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className='buttons flex-center flex-col'>
          <button className='btn btn-submit'>Signup</button>
          <button className='btn btn-link'>
            Already have an account? <Link to='/login'>Login</Link>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Signup;
