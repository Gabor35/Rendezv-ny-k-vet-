import React, { useState, useEffect } from 'react';  
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Login } from './Login';
import { Register } from './Register';
import { ForgotPassword } from './ForgotPassword';
import AddEvent from './AddEvent';
import { EventList } from './EventList';
import logo from './logo.jpg';
import hatterGif from './hatter1.gif';
import { Chat}  from './chat';
import { Calendar } from './calendar';
import { Saved } from './saved';
import Esemenyek from './Esemenyek';
import axios from "axios";

export const App = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Ellenőrizzük, hogy a felhasználó be van-e jelentkezve a localStorage-ból
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('felhasz'));
    if (storedUser) {
      setUser(storedUser);
    }
    let url = "http://localhost:5000/api/Esemeny/";
    axios
      .get(url)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, newEvent];
      updatedEvents.sort((a, b) => new Date(a.datum) - new Date(b.datum));
      return updatedEvents;
    });
    setIsModalOpen(false);
  };

  return (
    <Router>
      <div style={{
        backgroundImage: `url(${hatterGif})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}>

        {/* Main Navbar */}
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
            <div className="collapse navbar-collapse" id="navbarNav">

              <ul className="nav nav-pills">
                {user && (  // Ha be van jelentkezve a felhasználó
                  <>
                    <li className="nav-item">
                      <NavLink to="/events" style={{ backgroundColor: 'transparent', border: 'none', color: 'black' }} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                        Eseményrendező
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <button style={{ color: 'black' }} className="nav-link btn btn-link" onClick={() => setIsModalOpen(true)}>
                        Új Esemény Hozzáadása
                      </button>
                    </li>
                    <li className="nav-item dropdown">
                  <NavLink
                    to="#"
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ backgroundColor: 'transparent', border: 'none', color: 'black' }}
                  >
                    Továbbiak
                  </NavLink>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <NavLink to="/chat" className={({ isActive }) => "dropdown-item" + (isActive ? " active" : "")}>
                        Chat
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/calendar" className={({ isActive }) => "dropdown-item" + (isActive ? " active" : "")}>
                        Kalendárium
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/saved" className={({ isActive }) => "dropdown-item" + (isActive ? " active" : "")}>
                        Mentések
                      </NavLink>
                    </li>
                  </ul>
                </li>
                  </>
                )}
                
              </ul>
              <ul className="navbar-nav ms-auto">
                {!user ? (  // Ha a felhasználó nincs bejelentkezve
                  <>
                    <li className="nav-item">
                      <NavLink to="/login" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                        <span className="btn btn-light">Bejelentkezés</span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/register" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                        <span className="btn btn-light">Regisztráció</span>
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <button onClick={() => {
                      localStorage.removeItem('felhasz');
                      setUser(null);
                      window.location.href = '/login';
                    }} className="nav-link btn btn-link" >Kijelentkezés</button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>

        {/* Események listája */}
        <div className="container mt-4">
          <Routes>
            <Route path="/events" element={<EventList events={events} />} />
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path='/events' element={<Esemenyek />}/>
            <Route path="/chat" element={<Chat />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>

        {/* A modális ablak */}
        {isModalOpen && (
          <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Új esemény hozzáadása</h5>
                  <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <AddEvent onAddEvent={handleAddEvent} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};
