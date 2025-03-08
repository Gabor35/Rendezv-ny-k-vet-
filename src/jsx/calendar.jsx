import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { motion } from 'framer-motion';
import '../calendar.css';

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  }, []);

  const renderHeader = () => (
    <motion.div 
      className="calendar-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button onClick={() => setCurrentDate(moment(currentDate).subtract(1, 'month'))}>
        &lt;
      </button>
      <h2>{currentDate.format('MMMM YYYY')}</h2>
      <button onClick={() => setCurrentDate(moment(currentDate).add(1, 'month'))}>
        &gt;
      </button>
    </motion.div>
  );

  const renderDays = () => {
    const weekdays = ['Vas', 'Hét', 'Ke', 'Sze', 'Csü', 'Pén', 'Szo'];
    return (
      <motion.div 
        className="calendar-days"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {weekdays.map((day, index) => (
          <motion.div 
            key={day} 
            className="calendar-day-name"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {day}
          </motion.div>
        ))}
      </motion.div>
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
          <motion.div
            key={day}
            className={`calendar-cell ${
              !cloneDay.isSame(currentDate, 'month') ? 'disabled' : ''
            } ${cloneDay.isSame(moment(), 'day') ? 'today' : ''}`}
            onClick={() => setSelectedDate(cloneDay)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: (day.diff(startDate, 'days') * 0.05) }}
          >
            <span>{cloneDay.format('D')}</span>
            {eventsForDay.length > 0 && (
              <div className="event-dot">{eventsForDay.length}</div>
            )}
          </motion.div>
        );
        day = moment(day).add(1, 'day');
      }
      rows.push(
        <motion.div 
          key={day} 
          className="calendar-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {days}
        </motion.div>
      );
      days = [];
    }
    return rows;
  };

  return (
    <motion.div 
      className="calendar-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {renderHeader()}
      {renderDays()}
      <div className="calendar-body">{renderCells()}</div>
      {selectedDate && (
        <motion.div 
          className="selected-date-events"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
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
        </motion.div>
      )}
    </motion.div>
  );
};