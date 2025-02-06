import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import { Login } from './Login';
import { Register } from './Register';
import { ForgotPassword } from './ForgotPassword';
import { AddEvent } from './AddEvent';
import logo from './logo.jpg';

export const App = ()=> {
  return (
    <Router>
      <div>
        <header className="d-flex justify-content-between align-items-center p-3 bg-light">
          <div className="d-flex align-items-center">
            <img src={logo} alt="Logo" className="me-2" style={{ width: '50px', height: '50px' }} />
            <h1 className="h4 mb-0 ms-3">Eseményrendező</h1>
          </div>
          <div>
            <NavLink to="/login" className="btn btn-light me-2">Bejelentkezés</NavLink>
            <NavLink to="/register" className="btn btn-light">Regisztráció</NavLink>
          </div>
        </header>

        <div className="container mt-4">
          <h2 className="text-center mb-4">Események</h2>
          <Link to="/add-event" className="btn btn-light">Új Esemény Hozzáadása</Link>
        </div>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/add-event" element={<AddEvent />} />
        </Routes>
      </div>
    </Router>
  );
}