import React, { useState, useEffect } from 'react';
import './Reservation.css';

const Reservation = () => {
  const [facilityData, setFacilityData] = useState([]);
  const [facility, setFacility] = useState('Swimming Pool');
  const [selectedFacilityInfo, setSelectedFacilityInfo] = useState(null);
  const [date, setDate] = useState('');
  const [participants, setParticipants] = useState('');
  const [isAffiliated, setIsAffiliated] = useState("No");
  const [purpose, setPurpose] = useState('');
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch('/Facility_Data.lis')
      .then(response => response.text())
      .then(text => {
        const parsedFacilities = parseFacilityData(text);
        setFacilityData(parsedFacilities);
        setSelectedFacilityInfo(parsedFacilities.find(f => f.name === 'Swimming Pool'));
      })
      .catch(err => console.error('Error fetching the data:', err));

    const existingReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    setReservations(existingReservations);
  }, []);

  const parseFacilityData = (data) => {
    const lines = data.split('\n');
    const facilities = [];
    let facility = {};

    lines.forEach(line => {
      if (line.startsWith('Name :')) {
        facility = { name: line.split(':')[1].trim() };
      } else if (line.startsWith('Desc :')) {
        facility.desc = line.split(':')[1].trim();
      } else if (line.startsWith('Days :')) {
        facility.days = line.split(':')[1].trim();
      } else if (line.startsWith('Participants :')) {
        const range = line.split(':')[1].trim().split('-').map(num => parseInt(num.trim()));
        facility.participants = range;
      } else if (line.startsWith('Location :')) {
        facility.location = line.split(':')[1].trim();
      } else if (line.startsWith('Available :')) {
        facility.available = line.split(':')[1].trim();
        facility.image = `/AssignImages/${facility.name.toLowerCase().replace(/\s/g, '_')}.jpg`;
        facilities.push(facility);
      }
    });
    return facilities;
  };

  const handleFacilityChange = (e) => {
    const selectedFacilityName = e.target.value;
    setFacility(selectedFacilityName);
    const selectedInfo = facilityData.find(f => f.name === selectedFacilityName);
    setSelectedFacilityInfo(selectedInfo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const [minParticipants, maxParticipants] = selectedFacilityInfo.participants;
    const numParticipants = parseInt(participants);
    if (numParticipants < minParticipants || numParticipants > maxParticipants) {
      alert("Cannot Reserve: Invalid number of participants.");
      return;
    }

    const selectedDate = new Date(date);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      alert("Cannot Reserve: Selected date precedes current date.");
      return;
    }

    if (selectedFacilityInfo.available.includes('Only for SUNY Korea') && isAffiliated === "No") {
      alert("Cannot Reserve: This facility is only for SUNY Korea students.");
      return;
    }

    const dayOfWeek = getDayOfWeek(selectedDate);
    const availableDays = selectedFacilityInfo.days.split(', ').map(day => day.trim());
    const dayNames = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const selectedDay = dayNames[dayOfWeek];

    if (!availableDays.includes(selectedDay)) {
      alert(`Cannot Reserve: This facility is not available on ${selectedDay}.`);
      return;
    }

    const existingReservation = reservations.find(r => r.facility === facility);
  if (existingReservation) {
    alert("Cannot Reserve: You already have a reservation for this facility.");
    return;
  }

    const newReservation = { facility, date, participants: numParticipants, purpose, isAffiliated: isAffiliated === "Yes"};
    const updatedReservations = [...reservations, newReservation];
    setReservations(updatedReservations);
    localStorage.setItem('reservations', JSON.stringify(updatedReservations));

    alert("Reservation successful!");
  };

  const getDayOfWeek = (date) => {
    const q = date.getDate();
    let m = date.getMonth() + 1;
    let year = date.getFullYear();
    if (m === 1 || m === 2) {
      m += 12;
      year -= 1;
    }
    const k = year % 100;
    const j = Math.floor(year / 100);
    const h = (q + Math.floor((13 * (m + 1)) / 5) + k + Math.floor(k / 4) + Math.floor(j / 4) + 2 * j) % 7;
    const d = (h + 5) % 7;

    return d;
  };

  return (
    <div className="reservation-container">
      <div className="facility-selection">
        <select value={facility} onChange={handleFacilityChange}>
          {facilityData.map(facility => (
            <option key={facility.name} value={facility.name}>
              {facility.name}
            </option>
          ))}
        </select>
      </div>
      <div className="facility-display">
          {selectedFacilityInfo && (
            <>
                <div className="facility-image-container">
                    <img className="facility-image" src={selectedFacilityInfo.image} alt={selectedFacilityInfo.name}/>
                </div>
                <div className="facility-info">
                <h2>{selectedFacilityInfo.name}</h2>
              <p>{selectedFacilityInfo.desc}</p>
              <p><strong>&#128197;</strong> {selectedFacilityInfo.days}</p>
              <p><strong>&#9893;</strong> {`${selectedFacilityInfo.participants[0]} - ${selectedFacilityInfo.participants[1]}`}</p>
              <p><strong>&#9906;</strong> {selectedFacilityInfo.location}</p>
              <p><strong>&#9745;</strong> {selectedFacilityInfo.available}</p>
                </div>
            </>
          )}
      </div>

      <form onSubmit={handleSubmit} className="reservation-form">
        <div>
          <label>Select Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>

        <div>
          <label>Number of Participants:</label>
          <input
            type="number"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Are you affiliated with SUNY Korea?</label>
          <div>
            <label>
              <input type="radio" value="Yes" checked={isAffiliated === "Yes"} onChange={(e) => setIsAffiliated(e.target.value)}/>
              SUNY Korea
            </label>
            <label>
              <input type="radio" value="No" checked={isAffiliated === "No"} onChange={(e) => setIsAffiliated(e.target.value)}/>
              Non-SUNY Korea
            </label>
          </div>
        </div>
        <div>
          <label>Purpose of Use:</label>
          <textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Reservation;
