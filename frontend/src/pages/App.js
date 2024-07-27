// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../components/layouts/header';
import Footer from '../components/layouts/footer';
import '../styles/App.module.css';
import LoginPage from '../pages/login/loginPage';
import FindId from '../components/login/FindId';
import FindPassword from '../components/login/FindPassword';
import Register from '../components/login/register';
import SignUp from '../components/login/signUp';
import FindPasswordInput from '../components/login/FindPasswordInput';
import SignUpProfile from '../components/login/SignUpProfile';
import SignUpEnd from '../components/login/signUpEnd';

function App() {
  return <>
      <div className="app">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/findId" element={<FindId />} />
            <Route path="/findPassword" element={<FindPassword />} />
            <Route path="/findPasswordInput" element={<FindPasswordInput />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/signupProfile" element={<SignUpProfile/>} />
            <Route path="/signupEnd" element={<SignUpEnd/>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
}

export default App;