import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Main from './components/main.jsx';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';

function App() {
  

  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Main />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create1' element={<Signup />} />
          
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;