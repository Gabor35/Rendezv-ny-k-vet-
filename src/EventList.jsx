import React, { useState, useEffect } from 'react';
import { useGlobalContext } from './Context/GlobalContext';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

// Képek importálása
import heartIcon from './heart.svg'; // Regular heart icon
import heartFillIcon from './heart-fill.svg'; // Filled heart icon

export const EventList = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hoverStates, setHoverStates] = useState({});
  const [filledHearts, setFilledHearts] = useState({});
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const {apiUrl, loggedUser} = useGlobalContext();

  // Get the user token from localStorage
  const userData = JSON.parse(localStorage.getItem('felhasz'));
  const token = userData ? userData.token : null;

  // Check which events are already saved when component loads
  useEffect(() => {
    const checkSavedEvents = async () => {
      if (!token || !events.length || initialLoadDone) return;

      try {
        const savedHearts = {};
        
        // Check each event if it's saved
        for (const event of events) {
          const response = await axios.get(`${apiUrl}Reszvetel/check/${token}/${event.id}`);
          savedHearts[event.id] = response.data;
        }

        setFilledHearts(savedHearts);
        setInitialLoadDone(true);
      } catch (error) {
        console.error('Error checking saved events:', error);
      }
    };

    checkSavedEvents();
  }, [events, initialLoadDone, token]);

  // Updated function to handle heart icon click with API calls
  const handleHeartClick = async (eventId, e) => {
    e.preventDefault();
    
    if (!token) {
      alert('You must be logged in to save events');
      return;
    }

    try {
      alert(loggedUser.name);
      if (filledHearts[eventId]) {
        // If heart is filled, unsave the event
        await axios.delete(`${apiUrl}Reszvetel/${token}/${eventId}`);
      } else {
        // If heart is not filled, save the event
        await axios.post(`${apiUrl}Reszvetel/${token}/${eventId}`);
      }

      // Toggle the heart state
      setFilledHearts(prev => ({
        ...prev,
        [eventId]: !prev[eventId]
      }));
    } catch (error) {
      alert('Error: ' + (error.response?.data || error.message));
    }
  };

  const handleShowDetails = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const styles = {
    zoom: {
      transition: 'transform .2s',
    },
    zoomHover: {
      transform: 'scale(1.03)',
    },
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

  return (
    <div className="container mt-4">
      <div className="row">
        {events.map((event) => (
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
                    onClick={(e) => handleHeartClick(event.id, e)}
                  >
                    <img 
                      src={filledHearts[event.id] ? heartFillIcon : heartIcon} 
                      alt="Heart" 
                      style={{ width: '20px', verticalAlign: 'middle' }} 
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal az esemény részleteihez */}
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

export default EventList;
