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

// Auth Requests

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

// Post Requests

const createPost = async (body) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.post('/api/posts', { postData: body }, config);
    successPopup('Post Created!', getTheme());
    return response.data.posts.reverse();
  } catch (err) {
    errorPopup('No such user exists!', getTheme());
  }
};

const editPost = async (body, id) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.post(
      `/api/posts/edit/${id}`,
      { postData: body },
      config
    );
    successPopup('Post Edited!', getTheme());
    return response.data.posts.reverse();
  } catch (err) {
    err.response.status === 400
      ? errorPopup("You don't own this post!", getTheme())
      : errorPopup('No such user exists!', getTheme());
  }
};

const likePost = async (id) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.post(`api/posts/like/${id}`, {}, config);
    successPopup('Post Liked!', getTheme());
    return response.data.posts.reverse();
  } catch (err) {
    err.response.status === 400
      ? errorPopup("You've already liked this post!", getTheme())
      : errorPopup('No such user exists!', getTheme());
  }
};

const dislikePost = async (id) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.post(`api/posts/dislike/${id}`, {}, config);
    successPopup('Post Disliked!', getTheme());
    return response.data.posts.reverse();
  } catch (err) {
    err.response.status === 400
      ? errorPopup('Post not liked yet!', getTheme())
      : errorPopup('No such user exists!', getTheme());
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
  const response = await axios.get(`/api/posts`);
  return response.data.posts.reverse();
};

// Comment Requests

const createComment = async (body, id) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.post(
      `/api/comments/add/${id}`,
      { commentData: body },
      config
    );
    successPopup('Comment Created!', getTheme());
    return response.data.comments.reverse();
  } catch (err) {
    errorPopup('No such user exists!', getTheme());
  }
};

const editComment = async (body, postId, commentId) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.post(
      `/api/comments/edit/${postId}/${commentId}`,
      { commentData: body },
      config
    );
    successPopup('Comment Edited!', getTheme());
    return response.data.comments.reverse();
  } catch (err) {
    err.response.status === 400
      ? errorPopup("You don't own this comment!", getTheme())
      : errorPopup('No such user exists!', getTheme());
  }
};

const deleteComment = async (postId, commentId) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.delete(
      `/api/comments/delete/${postId}/${commentId}`,
      config
    );
    successPopup('Comment Deleted!', getTheme());
    return response.data.comments.reverse();
  } catch (err) {
    errorPopup('No such user exists!', getTheme());
  }
};

const getComment = async (postId, commentId) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.get(
      `/api/comments/${postId}/${commentId}`,
      config
    );
    return response.data.comment;
  } catch (err) {
    errorPopup('No such user exists!', getTheme());
  }
};

const getComments = async (id) => {
  const response = await axios.get(`/api/comments/${id}`);
  return response.data.comments.reverse();
};

// User Requests

const editUser = async (body) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.post(
      `/api/users/edit`,
      { userData: body },
      config
    );
    successPopup('Profile Updated!', getTheme());
    return response.data.user;
  } catch (err) {
    errorPopup('No such user exists!', getTheme());
  }
};

const starPost = async (id) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.post(`/api/users/bookmark/${id}`, {}, config);
    successPopup('Added to starred posts!', getTheme());
    return response.data.bookmarks;
  } catch (err) {
    err.response.status === 400
      ? errorPopup("You've already starred this post!", getTheme())
      : errorPopup('No such user exists!', getTheme());
  }
};

const unstarPost = async (id) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.post(
      `/api/users/remove-bookmark/${id}`,
      {},
      config
    );
    successPopup('Removed from starred posts!', getTheme());
    return response.data.bookmarks;
  } catch (err) {
    err.response.status === 400
      ? errorPopup('Post not starred yet!', getTheme())
      : errorPopup('No such user exists!', getTheme());
  }
};

const getStarred = async () => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.get(`/api/users/bookmark`, config);
    return response.data.bookmarks;
  } catch (err) {
    errorPopup('No such user exists!', getTheme());
  }
};

const followUser = async (id) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.post(`/api/users/follow/${id}`, {}, config);
    return [response.data.user, response.data.followUser];
  } catch (err) {
    err.response.status === 400
      ? errorPopup('You already follow this user!', getTheme())
      : errorPopup('No such user exists!', getTheme());
  }
};

const unfollowUser = async (id) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.post(`/api/users/unfollow/${id}`, {}, config);
    return [response.data.user, response.data.followUser];
  } catch (err) {
    err.response.status === 400
      ? errorPopup("You don't follow this user!", getTheme())
      : errorPopup('No such user exists!', getTheme());
  }
};

const getUser = async (id) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.get(`/api/users/${id}`, config);
    return response.data.user;
  } catch (err) {
    errorPopup('No such user exists!', getTheme());
  }
};

const getUsers = async () => {
  const response = await axios.get(`/api/users`);
  return response.data.users;
};

export {
  sendLoginReq,
  sendSignupReq,
  logoutUser,
  createPost,
  editPost,
  likePost,
  dislikePost,
  deletePost,
  getPost,
  getPosts,
  editUser,
  starPost,
  unstarPost,
  getStarred,
  followUser,
  unfollowUser,
  getUser,
  getUsers,
  createComment,
  editComment,
  deleteComment,
  getComment,
  getComments,
};
