import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Homepage } from './Homepage';
import Ranking from './ranking';
import Login from './Login';
import Profile from './Profile';
import Navbar from './Navbar';
import Rate from './Rate';
import Dashboard from './Dashboard';
import Footer from './Footer';
import NotFound from './NotFound';
import Signup from './Signup';

function App() {
  const [user, setUser] = useState(null); // I aksed AI for tutorial for how to use 'usestate'

  return (
    <Router>
      <Navbar user={user} />
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
        <Route path="/profile/:userId" element={<Profile user={user} setUser={setUser} />} />
        <Route path="/rate/:restroomId" element={<Rate user={user} />} />
        <Route path="/rate" element={<Rate user={user} />} />
        <Route path="/dashboard/:restroomId" element={<Dashboard user={user} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="" element={<NotFound />} /> 
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;