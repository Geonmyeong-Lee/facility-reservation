import React, { useState, useEffect } from 'react';
import './MyReservation.css';

const MyReservation = () => {
  	const [reservations, setReservations] = useState([]);
	const [facilities, setFacilities] = useState([]);
	const [userName, setUserName]= useState(localStorage.getItem("userName") || "John Doe");
	useEffect(() => {
		fetch('/Facility_Data.lis')
		  	.then(response => response.text())
		  	.then(text => {
				const parsedFacilities = parseFacilityData(text);
				setFacilities(parsedFacilities);
		  	})
		  	.catch(err => console.error('Error fetching the data:', err));
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
				facility.participants = line.split(':')[1].trim();
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
	
  	useEffect(() => {
    	const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    	setReservations(storedReservations);
  	}, []);

  	const handleCancelReservation = (index) => {
    	const updatedReservations = [...reservations];
    	updatedReservations.splice(index, 1);
    	setReservations(updatedReservations);
    	localStorage.setItem('reservations', JSON.stringify(updatedReservations));
  	}; 
	const getFacilityLocation = (facilityName) => {
		const facility = facilities.find(f => f.name === facilityName);
		return facility ? facility.location : 'Location not available';
	};

  	return (
    	<div className="my-reservations-container">
      	{reservations.length === 0 ? (
        	<p className="no-reservation">No reservations Yet</p>
      	) : (
        	reservations.map((reservation, index) => (
          		<div key={index} className="reservation-card">
            		<div className="reservation-image-container">
              		<img className="reservation-image" src={`/AssignImages/${reservation.facility.toLowerCase().replace(/\s/g, '_')}.jpg`} alt={reservation.facility}
              />
            		</div>
            	<div className="reservation-info">
					
              		<h3 className="reserved-info">{reservation.facility}</h3>
              		<p>&#9998;{reservation.purpose}</p>
              		<p>&#128197;{reservation.date}</p>
              		<p>&#9906;{getFacilityLocation(reservation.facility)} + {reservation.participants}</p>
              		<p>&#9893;{userName}</p>
              		<p>&#9745;{reservation.isAffiliated ? 'Only for SUNY Korea' : 'Available for All'}</p>
              		<button onClick={() => handleCancelReservation(index)}>Cancel Reservation</button>
            	</div>
          	</div>
        	))
      	)}
    </div>
  );
};

export default MyReservation;

