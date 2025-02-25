import React, { useState, useEffect } from 'react';  
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { Login } from './Login';
import { Register } from './Register';
import { ForgotPassword } from './ForgotPassword';
import AddEvent from './AddEvent';
import { EventList } from './EventList';
import logo from './logo.jpg';
import hatterGif from './hatter1.gif';
import { Chat } from './chat';
import { Calendar } from './calendar';
import { Saved } from './saved';
import Esemenyek from './Esemenyek';
import axios from "axios";

// Create a wrapper component to track the current route
const AppContent = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [filterDate, setFilterDate] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterName, setFilterName] = useState('');
  const location = useLocation(); // This hook gives us the current route

  // Check if we're on the events list page
  const isEventListPage = location.pathname === '/events';

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

  // Szűrjük az eseményeket dátum, helyszín és név alapján
  const filteredEvents = events.filter(event => {
    const isDateMatch = filterDate ? new Date(event.datum).toLocaleDateString() === new Date(filterDate).toLocaleDateString() : true;
    const isLocationMatch = filterLocation ? event.helyszin?.toLowerCase().includes(filterLocation.toLowerCase()) : true;
    const isNameMatch = filterName ? event.cime?.toLowerCase().includes(filterName.toLowerCase()) : true;
    return isDateMatch && isLocationMatch && isNameMatch;
  });

  return (
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
                  {/* Only show the "Új Esemény Hozzáadása" button when on the events page */}
                  {isEventListPage && (
                    <li className="nav-item">
                      <button style={{ color: 'black' }} className="nav-link btn btn-link" onClick={() => setIsModalOpen(true)}>
                        Új Esemény Hozzáadása
                      </button>
                    </li>
                  )}
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

      <div className="container mt-4">
        {/* Only show filter controls when on the events page */}
        {isEventListPage && (
          <div className="row mb-3">
            <div className="col">
              <input 
                type="date" 
                className="form-control" 
                value={filterDate} 
                onChange={(e) => setFilterDate(e.target.value)} 
                placeholder="Válassz dátumot"
              />
            </div>
            <div className="col">
              <input 
                type="text" 
                className="form-control" 
                value={filterLocation} 
                onChange={(e) => setFilterLocation(e.target.value)} 
                placeholder="Helyszín keresése"
              />
            </div>
            <div className="col">
              <input 
                type="text" 
                className="form-control" 
                value={filterName} 
                onChange={(e) => setFilterName(e.target.value)} 
                placeholder="Esemény neve"
              />
            </div>
          </div>
        )}

        {/* Események listája */}
        <Routes>
          <Route path="/events" element={<EventList events={filteredEvents} />} />
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
  );
};

// Main App component that wraps the content with Router
export const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};