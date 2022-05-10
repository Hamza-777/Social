import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Dashboard from './Components/Dashboard/Dashboard';
import Profile from './Components/Profile/Profile';
import PostPage from './Components/PostPage/PostPage';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import ProfileForm from './Components/ProfileForm/ProfileForm';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/post' element={<PostPage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/edit-profile' element={<ProfileForm />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
