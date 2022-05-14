import React, { useState, useEffect } from 'react';
import './ProfileForm.css';
import {
  FaRegEnvelope,
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
  FaGlobe,
  FaCamera,
} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editAUser, getAUser } from '../../Reducers/userReducer';
import Spinner from '../Spinner/Spinner';

const ProfileForm = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState('');
  const { user, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    desc: '',
    location: '',
    about: '',
    dob: '',
    email: '',
    website: '',
    twitter: '',
    facebook: '',
    instagram: '',
    youtube: '',
    linkedin: '',
  });

  const {
    desc,
    location,
    about,
    dob,
    email,
    website,
    twitter,
    facebook,
    instagram,
    youtube,
    linkedin,
  } = formData;

  useEffect(() => {
    dispatch(getAUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    setFormData((formData) => ({
      ...formData,
      desc: user?.desc,
      location: user?.location,
      about: user?.about,
      dob: user?.dob,
      email: user?.email,
      website: user?.website,
      twitter: user?.twitter,
      facebook: user?.facebook,
      instagram: user?.instagram,
      youtube: user?.youtube,
      linkedin: user?.linkedin,
    }));
    setAvatar(user?.avatar);
  }, [user]);

  const handleAvatar = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
  };

  const getFormData = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: name === 'dob' ? value.split('-').reverse().join('/') : value,
    }));
  };

  const editSelectedUser = (e) => {
    e.preventDefault();
    dispatch(editAUser({ ...formData, avatar: avatar ? avatar : user.avatar }));
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className='container'>
      {user && (
        <div className='profile-editor'>
          <p className='large'>Create Your Profile</p>
          <p className='lead'>
            Let's get some information to make your profile stand out
          </p>
          <form className='form' onSubmit={editSelectedUser}>
            <div className='form-group avatar-group'>
              <img
                src={avatar}
                alt={user?.username}
                className='avatar-setter'
              />
              <label htmlFor='img' className='for-avatar flex-center'>
                <FaCamera className='icon' />
              </label>
              <input
                type='file'
                id='img'
                name='img'
                accept='image/*'
                onChange={handleAvatar}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='* A short description of yourself'
                name='desc'
                value={desc}
                onChange={getFormData}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Location'
                name='location'
                value={location}
                onChange={getFormData}
              />
              <small className='form-text'>
                City & state suggested (eg. Amravati, Maharashtra)
              </small>
            </div>
            <div className='form-group'>
              <textarea
                placeholder='A short bio of yourself'
                name='about'
                value={about}
                onChange={getFormData}
              ></textarea>
            </div>
            <div className='form-group'>
              <label htmlFor='birthdate' className='message-text'>
                Date of birth:
              </label>
              <input
                type='date'
                id='birthdate'
                name='dob'
                value={dob && dob.split('/').reverse().join('-')}
                onChange={getFormData}
              />
            </div>
            <div className='form-group social-input'>
              <FaRegEnvelope className='icon fa-envelope' />
              <input
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={getFormData}
              />
            </div>
            <div className='form-group social-input'>
              <FaGlobe className='icon fa-globe' />
              <input
                type='text'
                placeholder='Website URL'
                name='website'
                value={website}
                onChange={getFormData}
              />
            </div>
            <div className='form-group social-input'>
              <FaTwitter className='icon fa-twitter' />
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={getFormData}
              />
            </div>

            <div className='form-group social-input'>
              <FaFacebook className='icon fa-facebook' />
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={getFormData}
              />
            </div>

            <div className='form-group social-input'>
              <FaYoutube className='icon fa-youtube' />
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={getFormData}
              />
            </div>

            <div className='form-group social-input'>
              <FaLinkedin className='icon fa-linkedin' />
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={getFormData}
              />
            </div>

            <div className='form-group social-input'>
              <FaInstagram className='icon fa-instagram' />
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={getFormData}
              />
            </div>
            <div className='buttons flex-center flex-col'>
              <button className='btn btn-submit'>Submit</button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default ProfileForm;
