import React from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  return (
    <section className='container' id='login-form'>
      <p className='h3' style={{ textAlign: 'center' }}>
        SIGNUP
      </p>
      <form className='form'>
        <div className='form-group'>
          <input type='text' placeholder='Enter Name' required />
        </div>
        <div className='form-group'>
          <input type='email' placeholder='Enter Email' required />
        </div>
        <div className='form-group'>
          <input type='password' placeholder='Enter Password' required />
        </div>
        <div className='form-group'>
          <input type='password' placeholder='Confirm Password' required />
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
