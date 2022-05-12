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
    return response.data.encodedToken;
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
      : response.data.encodedToken;
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

const addVideoToWatchLater = async (body) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.post('/api/user/watchlater', body, config);
    successPopup('Video added to watchlater!', getTheme());
    return response.data.watchlater;
  } catch (err) {
    if (err.response.status === 404) {
      errorPopup('No such user exists!', getTheme());
    } else {
      errorPopup('video already exists in watchlater!', getTheme());
    }
  }
};

const removeFromWatchLater = async (id) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.delete(`/api/user/watchlater/${id}`, config);
    successPopup('Video removed from watchlater!', getTheme());
    return response.data.watchlater;
  } catch (err) {
    errorPopup('No such user exists!', getTheme());
  }
};

const getWatchLaters = async () => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.get(`/api/user/watchlater`, config);
    return response.data.watchlater;
  } catch (err) {
    return;
  }
};

export {
  sendLoginReq,
  sendSignupReq,
  logoutUser,
  addVideoToWatchLater,
  removeFromWatchLater,
  getWatchLaters,
};
