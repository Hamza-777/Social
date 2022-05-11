import React from 'react';
import './ProfileForm.css';
import {
  FaRegEnvelope,
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
  FaGlobe,
} from 'react-icons/fa';

const ProfileForm = () => {
  return (
    <section class='container'>
      <div class='profile-editor'>
        <p class='large'>Create Your Profile</p>
        <p class='lead'>
          Let's get some information to make your profile stand out
        </p>
        <form class='form'>
          <div class='form-group'>
            <input
              type='text'
              placeholder='* A short description of yourself'
              name='description'
              required
            />
          </div>
          <div class='form-group'>
            <input type='text' placeholder='Location' name='location' />
            <small class='form-text'>
              City & state suggested (eg. Amravati, Maharashtra)
            </small>
          </div>
          <div class='form-group'>
            <textarea
              placeholder='A short bio of yourself'
              name='bio'
            ></textarea>
          </div>
          <div class='form-group'>
            <label for='birthdate' class='message-text'>
              Date of birth:
            </label>
            <input type='date' name='birthdate' />
          </div>
          <div class='form-group social-input'>
            <FaRegEnvelope className='icon fa-envelope' />
            <input type='email' placeholder='Email' name='email' />
          </div>
          <div class='form-group social-input'>
            <FaGlobe className='icon fa-globe' />
            <input type='text' placeholder='Website URL' name='website' />
          </div>
          <div class='form-group social-input'>
            <FaTwitter className='icon fa-twitter' />
            <input type='text' placeholder='Twitter URL' name='twitter' />
          </div>

          <div class='form-group social-input'>
            <FaFacebook className='icon fa-facebook' />
            <input type='text' placeholder='Facebook URL' name='facebook' />
          </div>

          <div class='form-group social-input'>
            <FaYoutube className='icon fa-youtube' />
            <input type='text' placeholder='YouTube URL' name='youtube' />
          </div>

          <div class='form-group social-input'>
            <FaLinkedin className='icon fa-linkedin' />
            <input type='text' placeholder='Linkedin URL' name='linkedin' />
          </div>

          <div class='form-group social-input'>
            <FaInstagram className='icon fa-instagram' />
            <input type='text' placeholder='Instagram URL' name='instagram' />
          </div>
          <div className='buttons flex-center flex-col'>
            <button className='btn btn-submit'>Submit</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProfileForm;
