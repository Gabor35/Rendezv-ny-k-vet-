import React, { useState, useEffect } from "react";
import axios from "axios";

const Esemenyek = () => {
  const [esemenyek, setEsemenyek] = useState([]);
  const [newEvent, setNewEvent] = useState({
    id: "",
    cime: "",
    helyszin: "",
    datum: "",
    leiras: "",
  });
  const [editEvent, setEditEvent] = useState(null);

  const token = "YOUR_API_TOKEN";

  useEffect(() => {
    let url = "https://esemenyrendezo1.azurewebsites.net/api/Esemeny/" + token;
    alert(url);
    axios
      .get(`/api/Esemeny/${token}`)
      .then((response) => {
        setEsemenyek(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, [token]);

  // Handle input changes for new event
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    axios
      .post(`/api/Esemeny/${token}`, newEvent)
      .then((response) => {
        setEsemenyek([...esemenyek, response.data]);
        setNewEvent({
          cime: "",
          helyszin: "",
          datum: "",
          leiras: "",
        });
      })
      .catch((error) => {
        console.error("Error adding event:", error);
      });
  };

  // Edit an event
  const handleEditEvent = (event) => {
    setEditEvent(event);
  };

  // Save updated event
  const handleUpdateEvent = (e) => {
    e.preventDefault();
    axios
      .put(`/api/Esemeny/${token}`, editEvent)
      .then((response) => {
        const updatedEvents = esemenyek.map((event) =>
          event.Id === response.data.Id ? response.data : event
        );
        setEsemenyek(updatedEvents);
        setEditEvent(null);
      })
      .catch((error) => {
        console.error("Error updating event:", error);
      });
  };

  // Delete an event
  const handleDeleteEvent = (id) => {
    axios
      .delete(`/api/Esemeny/${token},${id}`)
      .then(() => {
        const filteredEvents = esemenyek.filter((event) => event.Id !== id);
        setEsemenyek(filteredEvents);
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };

  return (
    <div>
      <h1>Események</h1>

      {/* Event list */}
      <div>
        {esemenyek.map((event) => (
          <div key={event.Id}>
            <h3>{event.cime}</h3>
            <p>{event.helyszin}</p>
            <p>{new Date(event.datum).toLocaleString()}</p>
            <p>{event.leiras}</p>
            <button onClick={() => handleEditEvent(event)}>Szerkesztés</button>
            <button onClick={() => handleDeleteEvent(event.id)}>Törlés</button>
          </div>
        ))}
      </div>

      {/* Add new event */}
      <h2>Új Esemény</h2>
      <form onSubmit={handleAddEvent}>
        <input
          type="text"
          name="cime"
          value={newEvent.cime}
          onChange={handleInputChange}
          placeholder="Esemény címe"
        />
        <input
          type="text"
          name="helyszin"
          value={newEvent.helyszin}
          onChange={handleInputChange}
          placeholder="Helyszín"
        />
        <input
          type="datetime-local"
          name="datum"
          value={newEvent.datum}
          onChange={handleInputChange}
        />
        <textarea
          name="leiras"
          value={newEvent.leiras}
          onChange={handleInputChange}
          placeholder="Esemény leírása"
        />
        <button type="submit">Hozzáadás</button>
      </form>

      {/* Edit event */}
      {editEvent && (
        <div>
          <h2>Esemény szerkesztése</h2>
          <form onSubmit={handleUpdateEvent}>
            <input
              type="text"
              name="cime"
              value={editEvent.cime}
              onChange={(e) => setEditEvent({ ...editEvent, cime: e.target.value })}
              placeholder="Esemény címe"
            />
            <input
              type="text"
              name="helyszin"
              value={editEvent.helyszin}
              onChange={(e) => setEditEvent({ ...editEvent, helyszin: e.target.value })}
              placeholder="Helyszín"
            />
            <input
              type="datetime-local"
              name="datum"
              value={editEvent.datum}
              onChange={(e) => setEditEvent({ ...editEvent, datum: e.target.value })}
            />
            <textarea
              name="leiras"
              value={editEvent.leiras}
              onChange={(e) => setEditEvent({ ...editEvent, leiras: e.target.value })}
              placeholder="Esemény leírása"
            />
            <button type="submit">Frissítés</button>
          </form>
        </div>
      )}
    </div>
  );
};
export default Esemenyek;
