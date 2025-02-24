import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './calendar.css';

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  // Get events from App.jsx's events state through props or context
  useEffect(() => {
    // You would typically get this from props or context
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  }, []);

  const renderHeader = () => {
    return (
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(moment(currentDate).subtract(1, 'month'))}>
          &lt;
        </button>
        <h2>{currentDate.format('MMMM YYYY')}</h2>
        <button onClick={() => setCurrentDate(moment(currentDate).add(1, 'month'))}>
          &gt;
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const weekdays = ['Vas', 'Hét', 'Ke', 'Sze', 'Csü', 'Pén', 'Szo'];
    return (
      <div className="calendar-days">
        {weekdays.map(day => (
          <div key={day} className="calendar-day-name">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = moment(currentDate).startOf('month');
    const monthEnd = moment(currentDate).endOf('month');
    const startDate = moment(monthStart).startOf('week');
    const endDate = moment(monthEnd).endOf('week');

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = moment(day);
        const eventsForDay = events.filter(event => 
          moment(event.Datum).format('YYYY-MM-DD') === cloneDay.format('YYYY-MM-DD')
        );

        days.push(
          <div
            key={day}
            className={`calendar-cell ${
              !cloneDay.isSame(currentDate, 'month') ? 'disabled' : ''
            } ${cloneDay.isSame(moment(), 'day') ? 'today' : ''}`}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <span>{cloneDay.format('D')}</span>
            {eventsForDay.length > 0 && (
              <div className="event-dot">
                {eventsForDay.length}
              </div>
            )}
          </div>
        );
        day = moment(day).add(1, 'day');
      }
      rows.push(
        <div key={day} className="calendar-row">
          {days}
        </div>
      );
      days = [];
    }
    return rows;
  };

  return (
    <div className="calendar-container">
      {renderHeader()}
      {renderDays()}
      <div className="calendar-body">
        {renderCells()}
      </div>
      {selectedDate && (
        <div className="selected-date-events">
          <h3>{selectedDate.format('YYYY. MMMM D.')}</h3>
          {events
            .filter(event => 
              moment(event.Datum).format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD')
            )
            .map(event => (
              <div key={event.EsemenyID} className="event-item">
                <h4>{event.Cime}</h4>
                <p>{event.Helyszin}</p>
                <p>{moment(event.Datum).format('HH:mm')}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};