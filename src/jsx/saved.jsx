import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { useGlobalContext } from '../Context/GlobalContext';
import { motion } from 'framer-motion'; // Framer Motion importálása

// Import icons
import heartFillIcon from '../pictures/heart-fill.svg';

export const Saved = () => {
  const [savedEvents, setSavedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { apiUrl} = useGlobalContext();

  const userData = JSON.parse(localStorage.getItem('felhasz'));
  const token = userData ? userData.token : null;

  useEffect(() => {
    const fetchSavedEvents = async () => {
      setLoading(true);
      try {
        if (!token) {
          setError('You must be logged in to view saved events');
          setLoading(false);
          return;
        }
        const response = await axios.get(`${apiUrl}Reszvetel/saved/${token}`);
        setSavedEvents(response.data);
        setError(null);
      } catch (err) {
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

  const handleUnsaveEvent = async (eventId, e) => {
    e.preventDefault();
    if (!token) {
      setError('You must be logged in to unsave events');
      return;
    }
    try {
      await axios.delete(`${apiUrl}Reszvetel/${token}/${eventId}`);
      setSavedEvents(savedEvents.filter(event => event.id !== eventId));
    } catch (err) {
      setError('Failed to unsave event: ' + (err.response?.data || err.message));
    }
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
    </div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {savedEvents.map((event, index) => (
          <motion.div 
            className="col-md-4" 
            key={event.id} 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="card mb-3">
              <img
                src={`https://images-0prm.onrender.com/${event.kepurl}`}
                className="card-img-top"
                alt={event.cime}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{event.cime}</h5>
                <p className="card-text">Dátum: {new Date(event.datum).toLocaleString()}</p>
                <p className="card-text">Helyszín: {event.helyszin}</p>
                <motion.button
                  className="btn btn-secondary"
                  onClick={() => handleShowDetails(event)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Részletek
                </motion.button>
                <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                  <button 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px' }}
                    onClick={(e) => handleUnsaveEvent(event.id, e)}
                  >
                    <motion.img 
                      src={heartFillIcon} 
                      alt="Unsave" 
                      style={{ width: '20px', verticalAlign: 'middle' }} 
                      whileHover={{ scale: 1.2 }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent?.cime}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={`https://images-0prm.onrender.com/${selectedEvent?.kepurl}`}
            alt={selectedEvent?.cime}
            className="img-fluid mb-3"
            style={{ width: '100%', objectFit: 'cover' }}
          />
          <p><strong>Dátum:</strong> {new Date(selectedEvent?.datum).toLocaleString()}</p>
          <p><strong>Helyszín:</strong> {selectedEvent?.helyszin}</p>
          <p><strong>Leírás:</strong> {selectedEvent?.leiras}</p>
        </Modal.Body>
        <Modal.Footer>
          <motion.button
            className="btn btn-secondary"
            onClick={() => setShowModal(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Bezárás
          </motion.button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Saved;