import axios from 'axios';
import {
  getTheme,
  setAuth,
  getAuth,
  setUser,
  removeAuth,
  removeUser,
} from './localStorage';
import { successPopup, errorPopup } from './toasts';

const sendLoginReq = async (body) => {
  try {
    const response = await axios.post('/api/auth/login', body);
    setAuth(response.data.encodedToken);
    setUser(response.data.foundUser);
    successPopup('Logged In successfully!', getTheme());
    return response.data.encodedToken === undefined
      ? null
      : [response.data.encodedToken, response.data.foundUser];
  } catch (err) {
    err.response.status === 401
      ? errorPopup('Authorization denied! Wrong credentials.', getTheme())
      : errorPopup('No such user exists!', getTheme());
  }
};

const sendSignupReq = async (body) => {
  try {
    const response = await axios.post('/api/auth/signup', body);
    setAuth(response.data.encodedToken);
    setUser(response.data.createdUser);
    successPopup('Signed Up successfully!', getTheme());
    return response.data.encodedToken === undefined
      ? null
      : [response.data.encodedToken, response.data.createdUser];
  } catch (err) {
    if (err.response.status === 422) {
      errorPopup('User already exists!', getTheme());
    }
  }
};

const logoutUser = () => {
  removeAuth();
  removeUser();
};

const createPost = async (body) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.post('/api/posts', { postData: body }, config);
    successPopup('Post Created!', getTheme());
    console.log(response.data.posts);
    return response.data.posts.reverse();
  } catch (err) {
    console.log(err);
    errorPopup('No such user exists!', getTheme());
  }
};

const deletePost = async (id) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.delete(`/api/posts/${id}`, config);
    successPopup('Post Deleted', getTheme());
    return response.data.posts.reverse();
  } catch (err) {
    errorPopup('No such user exists!', getTheme());
  }
};

const getPost = async (id) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.get(`/api/posts/${id}`, config);
    return response.data.post;
  } catch (err) {
    errorPopup('No such user exists!', getTheme());
  }
};

const getPosts = async () => {
  try {
    const response = await axios.get(`/api/posts`);
    return response.data.posts.reverse();
  } catch (err) {
    errorPopup('No such user exists!', getTheme());
  }
};

export {
  sendLoginReq,
  sendSignupReq,
  logoutUser,
  createPost,
  deletePost,
  getPost,
  getPosts,
};
