import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from '../components/layouts/header';
import Footer from '../components/layouts/footer';
import '../styles/App.module.css';
import Login from '../components/login/login';
import FindId from '../components/login/FindId';
import FindPassword from '../components/login/FindPassword';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then(response => response.text())
      .then(data => setMessage(data));
  }, []);

  return <>
      <div className="app">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/find-id" element={<FindId />} />
            <Route path="/find-password" element={<FindPassword />} />
          </Routes>
        </div>
        <Footer />
      </div>
  </>
}

export default App;