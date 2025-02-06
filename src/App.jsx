import React, { useState } from 'react';
import logo from './logo.jpg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const toggleLoginPanel = () => {
    setShowLogin(!showLogin);
    setShowRegister(false);
    setShowForgotPassword(false);
  };

  const toggleRegisterPanel = () => {
    setShowRegister(!showRegister);
    setShowLogin(false);
    setShowForgotPassword(false);
  };

  const toggleForgotPasswordPanel = () => {
    setShowForgotPassword(!showForgotPassword);
    setShowLogin(false);
    setShowRegister(false);
  };

  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: ''
  });
  const [events, setEvents] = useState([]); // Az események listája

  // Modal megjelenítése
  const toggleAddEventModal = () => setShowAddEventModal(!showAddEventModal);

  // Események hozzáadása
  const handleAddEvent = () => {
    setEvents([...events, newEvent]);
    setNewEvent({ title: '', description: '', date: '' }); // Üresíti az űrlapot
    setShowAddEventModal(false); // Bezárja a modalt
  };

  // Modal űrlap kezelése
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      {/* Header */}
      <header style={{marginTop: '10px', fontSize: '25px'}} className="d-flex justify-content-between align-items-center p-3 bg-light">
        <div className="d-flex align-items-center">
          <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          overflow: 'hidden',
          transition: 'transform 0.3s ease-in-out',
        }}>
          <img src={logo} alt="Logo" style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease-in-out',
          }} className="me-2"  />
          </div>
          <h1 className="h4 mb-0 ms-3">Eseményrendező</h1>
        </div>
        <div>
          <button className="btn btn-light me-2" onClick={toggleLoginPanel}><svg className="me-1" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="icon bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
          </svg>Bejelentkezés</button>
          <button className="btn btn-light" onClick={toggleRegisterPanel}><svg className="me-1" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="icon bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
          </svg>Regisztráció</button>

        </div>
      </header>

      {/* Main Content */}
      <div style={{backgroundColor: 'lightgray'}}>
      <hr class="meret" />
      <div className="container mt-4">
        {/* User Icons */}
        <div className="d-flex justify-content-center mb-4">
          <div className="d-flex">
            {[logo, logo, logo, logo, logo, logo, logo, logo, logo, logo].map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`User ${index + 1}`}
                className="rounded-circle me-2"
                style={{ width: '65px', height: '65px', marginLeft: "40px" }}
              />
            ))}
          </div>
        </div>
        </div>
        <div className="container mt-4">
        {/* Events Section */}
        <h2 className="text-center mb-4">Események</h2>
        <div>
          <button style={{marginBottom: '7px'}} className="btn btn-light" onClick={toggleAddEventModal}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="icon bi bi-plus-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg> Új Esemény Hozzáadása</button>
        </div>
        <div className="row">
          {/* Események */}
      <div className="row">
        {events.map((event, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">{event.description}</p>
                <p className="card-text"><small className="text-muted">{event.date}</small></p>
              </div>
            </div>
          </div>
        ))}
      </div>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((event, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card">
                <img
                  src={index > -1 ? logo : `event${event}.jpg`}
                  className="card-img-top"
                  alt={`Event ${event}`}
                />
                
                <div className="card-body d-flex justify-content-between">
                  <button className="btn btn-light">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                    </svg>
                  </button>
                  <button className="btn btn-light">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                    </svg>
                  </button>
                  <button className="btn btn-light">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
         
          {/* Add Event Modal */}
          {showAddEventModal && (
            <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
              <div className="card" style={{ width: '400px' }}>
                <div className="card-header">
                  <h5 className="mb-0">Új Esemény Hozzáadása</h5>
                  <button className="btn-close" onClick={toggleAddEventModal}></button>
                </div>
                <div className="card-body">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Esemény Neve</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={newEvent.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Leírás</label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={newEvent.description}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="date" className="form-label">Dátum</label>
                      <input
                        type="date"
                        className="form-control"
                        id="date"
                        name="date"
                        value={newEvent.date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <button type="button" className="btn btn-outline-dark w-100" onClick={handleAddEvent}>
                      Esemény Hozzáadása
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Login Panel */}
      {showLogin && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
          <div className="card" style={{ width: '400px' }}>
            <div className="card-header d-flex justify-content-between align-items-center">
              <img src={logo} alt="Logo" className="" style={{ width: '50px', height: '50px' }} />
              <h5 className="mb-0" class="logincenter">Bejelentkezés</h5>
              <button className="btn-close" onClick={toggleLoginPanel}></button>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email cím vagy Felhasználónév</label>
                  <input type="text" className="form-control" id="email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Jelszó</label>
                  <input type="password" className="form-control" id="password" required />
                </div>
                <p className="text-secondary" style={{ cursor: 'pointer' }} onClick={toggleForgotPasswordPanel}>Elfelejtett Jelszó</p>
                <button type="submit" className="btn btn-outline-dark w-100">Bejelentkezés</button>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Registration Panel */}
      {showRegister && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
          <div className="card" style={{ width: '400px' }}>
            <div className="card-header d-flex justify-content-between align-items-center">
              <img src={logo} alt="Logo" className="" style={{ width: '50px', height: '50px' }} />
              <h5 className="mb-0" class="registercenter">Regisztráció</h5>
              <button className="btn-close position-absolute end-0 me-2" onClick={toggleRegisterPanel}></button>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="register-username" className="form-label">Felhasználónév</label>
                  <input type="text" className="form-control" id="register-username" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="register-email" className="form-label">Email cím</label>
                  <input type="email" className="form-control" id="register-email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="register-password" className="form-label">Jelszó</label>
                  <input type="password" className="form-control" id="register-password" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="register-password-confirm" className="form-label">Jelszó megerősítés</label>
                  <input type="password" className="form-control" id="register-password-confirm" required />
                </div>
                <button type="submit" className="btn btn-outline-dark w-100">Regisztráció</button>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Forgot Password Panel */}
      {showForgotPassword && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
          <div className="card" style={{ width: '400px' }}>
            <div className="card-header d-flex justify-content-center align-items-center">
              <h5 className="mb-0">Elfelejtett Jelszó</h5>
              <button className="btn-close position-absolute end-0 me-2" onClick={toggleForgotPasswordPanel}></button>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="forgot-email" className="form-label">Email cím</label>
                  <input type="email" className="form-control" id="forgot-email" placeholder="Add meg az email címed" required />
                </div>
                <button type="submit" className="btn btn-outline-dark w-100">Jelszó Visszaállítása</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
export default App;
