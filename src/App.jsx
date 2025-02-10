import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Login } from './Login'; 
import { Register } from './Register';
import { ForgotPassword } from './ForgotPassword';
import { AddEvent } from './AddEvent';
import { EventList } from './EventList';
import logo from './logo2.jpg';

//asda
export const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid">
          <div className="navbar-brand">
            <img src={logo} alt="Logo" className="me-2" style={{ width: '50px', height: '50px' }} />

          </div>
          <button className="navbar-toggler" type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Eseményrendező</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/add-event" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Új Esemény Hozzáadása</NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink to="/login" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}><span className="btn btn-light">Bejelentkezés</span></NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}><span className="btn btn-light">Regisztráció</span></NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <h2 className="text-center mb-4">Események</h2>
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}
