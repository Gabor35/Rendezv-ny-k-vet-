import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useGlobalContext } from '../Context/GlobalContext';

// Import icons
import heartFillIcon from '../pictures/heart-fill.svg';

export const Saved = () => {
  const [savedEvents, setSavedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hoverStates, setHoverStates] = useState({});
  const {apiUrl} = useGlobalContext();

  // Get the user data from localStorage and extract the token
  const userData = JSON.parse(localStorage.getItem('felhasz'));
  const token = userData ? userData.token : null;

  // Fetch saved events when component mounts
  useEffect(() => {
    const fetchSavedEvents = async () => {
      setLoading(true);
      try {
        if (!token) {
          setError('You must be logged in to view saved events');
          setLoading(false);
          return;
        }

        // Log the token and URL for debugging
        console.log('Token:', token);
        console.log('API URL:', `/api/Reszvetel/saved/${token}`);

        const response = await axios.get(`http://localhost:5000/api/Reszvetel/saved/${token}`);
        console.log('API Response:', response.data);
        setSavedEvents(response.data);
        setError(null);
      } catch (err) {
        console.error('Error details:', err);
        setError('Failed to fetch saved events: ' + (err.response?.data || err.message));
        setSavedEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedEvents();
  }, [token]);

  const handleShowDetails = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleMouseEnter = (eventId) => {
    setHoverStates((prev) => ({
      ...prev,
      [eventId]: true,
    }));
  };

  const handleMouseLeave = (eventId) => {
    setHoverStates((prev) => ({
      ...prev,
      [eventId]: false,
    }));
  };

  // Handle removing an event from saved
  const handleUnsaveEvent = async (eventId, e) => {
    e.preventDefault();
    
    if (!token) {
      setError('You must be logged in to unsave events');
      return;
    }

    try {
      console.log('Unsaving event:', eventId);
      console.log('API URL:', `${apiUrl}Reszvetel/${token}/${eventId}`);
      
      await axios.delete(`${apiUrl}Reszvetel/${token}/${eventId}`);
      // Remove the event from the local state
      setSavedEvents(savedEvents.filter(event => event.id !== eventId));
    } catch (err) {
      console.error('Error details:', err);
      setError('Failed to unsave event: ' + (err.response?.data || err.message));
    }
  };

  const styles = {
    zoom: {
      transition: 'transform .2s',
    },
    zoomHover: {
      transform: 'scale(1.03)',
    },
  };

  if (loading) {
    return <div className="container mt-4">Loading saved events...</div>;
  }

  if (error) {
    return <div className="container mt-4 alert alert-danger">{error}</div>;
  }

  if (savedEvents.length === 0) {
    return <div className="container mt-4 d-flex justify-content-center align-items-center" style={{ height: "100vh", fontSize: "30px" }}>
    <div className="text-white">Nincsenek mentések!</div>
  </div>
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {savedEvents.map((event) => (
          <div className="col-md-4" key={event.id}>
            <div className="card mb-3">
              <img
                src={"http://files.esemenyrendezo.nhely.hu/"+event.kepurl}
                className="card-img-top"
                alt={event.cime}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{event.cime}</h5>
                <p className="card-text">Dátum: {new Date(event.datum).toLocaleString()}</p>
                <p className="card-text">Helyszín: {event.helyszin}</p>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleShowDetails(event)}
                  style={{
                    ...styles.zoom,
                    ...(hoverStates[event.id] ? styles.zoomHover : {}),
                  }}
                  onMouseEnter={() => handleMouseEnter(event.id)}
                  onMouseLeave={() => handleMouseLeave(event.id)}
                  disabled={showModal}
                >
                  Részletek
                </button>
                <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                  <button 
                    style={{
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer',
                      padding: '5px',
                    }}
                    onClick={(e) => handleUnsaveEvent(event.id, e)}
                  >
                    <img 
                      src={heartFillIcon} 
                      alt="Unsave" 
                      style={{ width: '20px', verticalAlign: 'middle' }} 
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for event details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent?.cime}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={"http://files.esemenyrendezo.nhely.hu/"+selectedEvent?.kepurl}
            alt={selectedEvent?.cime}
            className="img-fluid mb-3"
            style={{ width: '100%', objectFit: 'cover' }}
          />
          <p><strong>Dátum:</strong> {new Date(selectedEvent?.datum).toLocaleString()}</p>
          <p><strong>Helyszín:</strong> {selectedEvent?.helyszin}</p>
          <p><strong>Leírás:</strong> {selectedEvent?.leiras}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              backgroundColor: 'gray',
              ...styles.zoom,
              ...(hoverStates[selectedEvent?.id] ? styles.zoomHover : {}),
            }}
            variant="secondary"
            onClick={() => setShowModal(false)}
            onMouseEnter={() => handleMouseEnter(selectedEvent?.id)}
            onMouseLeave={() => handleMouseLeave(selectedEvent?.id)}
          >
            Bezárás
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Saved;