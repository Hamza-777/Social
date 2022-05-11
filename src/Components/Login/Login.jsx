import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  return (
    <section className='container' id='login-form'>
      <p className='h3' style={{ textAlign: 'center' }}>
        LOGIN
      </p>
      <form className='form'>
        <div className='form-group'>
          <input type='email' placeholder='Your Email' required />
        </div>
        <div className='form-group'>
          <input type='password' placeholder='Your Password' required />
        </div>
        <div className='buttons flex-center flex-col'>
          <button className='btn btn-submit'>Login</button>
          <button className='btn btn-submit'>
            Login with guest credentials
          </button>
          <button className='btn btn-link'>
            Don't have an account? <Link to='/signup'>Create Account</Link>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
