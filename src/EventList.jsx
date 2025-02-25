import React, { useState } from 'react'; // Import useState 
import { Modal, Button } from 'react-bootstrap';

// Képek importálása
import heartIcon from './heart.svg'; // Regular heart icon
import heartFillIcon from './heart-fill.svg'; // Add this import for the filled heart icon
// Remove the xlgIcon import since we won't be using it anymore

export const EventList = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Létrehoztunk egy objektumot, amely minden eseményhez külön-külön nyilvántartja a hover állapotot.
  const [hoverStates, setHoverStates] = useState({});
  
  // Add a new state to track which hearts are filled
  const [filledHearts, setFilledHearts] = useState({});

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

  // Add a function to handle heart icon click
  const handleHeartClick = (eventId, e) => {
    e.preventDefault(); // Prevent any default behavior
    setFilledHearts(prev => ({
      ...prev,
      [eventId]: !prev[eventId] // Toggle the heart state
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
                style={{ height: '200px', objectFit: 'cover' }} // Kép stílus beállítása
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
                  onMouseEnter={() => handleMouseEnter(event.id)} // Gomb hover állapot kezelése
                  onMouseLeave={() => handleMouseLeave(event.id)} // Hover állapot eltávolítása
                  disabled={showModal} // Ha a modal nyitva van, letiltjuk a gombot
                >
                  Részletek
                </button>
                {/* Only show the heart icon (either filled or unfilled) */}
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
                  {/* Removed the X icon button */}
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
            className="img-fluid mb-3" // A kép a modális ablakban is reszponzív legyen
            style={{ width: '100%', objectFit: 'cover' }} // Kép stílus beállítása a modálban
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
            }} // Hover és zoom alkalmazása itt
            variant="secondary"
            onClick={() => setShowModal(false)}
            onMouseEnter={() => handleMouseEnter(selectedEvent?.id)} // Hover állapot beállítása
            onMouseLeave={() => handleMouseLeave(selectedEvent?.id)} // Hover állapot eltávolítása
          >
            Bezárás
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};