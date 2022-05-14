import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Dashboard from './Components/Dashboard/Dashboard';
import Profile from './Components/Profile/Profile';
import PostPage from './Components/PostPage/PostPage';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import ProfileForm from './Components/ProfileForm/ProfileForm';
import Sidebar from './Components/Sidebar/Sidebar';
import Search from './Components/Search/Search';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from './Reducers/userReducer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, user]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path='/post/:postId'
          element={
            <PrivateRoute>
              <PostPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/profile/:userId'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path='/edit-profile/:userId'
          element={
            <PrivateRoute>
              <ProfileForm />
            </PrivateRoute>
          }
        />
        <Route
          path='/search'
          element={
            <PrivateRoute>
              <Search />
            </PrivateRoute>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <Sidebar />
      <ToastContainer />
    </Router>
  );
}

export default App;
