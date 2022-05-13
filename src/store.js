import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Reducers/authReducer';
import postReducer from './Reducers/postReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});
