import React, { useState, useEffect } from 'react';
import './FacilityList.css';

const FacilityList = () => {
  const [facilities, setFacilities] = useState([]);

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

  return (
    <div className="facility-list">
      {facilities.map((facility, index) => (
        <div key={index} className="facility-card">
          <img src={facility.image} alt={facility.name} className="facility-image" />
          <h2 className="facility-name">{facility.name}</h2>
          <p className="facility-desc">{facility.desc}</p>
          <p className="facility-desc"><strong>&#128197;</strong> {facility.days}</p>
          <p className="facility-desc"><strong>&#9893;</strong> {facility.participants}</p>
          <p className="facility-desc"><strong>&#9906;</strong> {facility.location}</p>
          <p className="facility-desc"><strong>&#9745;</strong> {facility.available}</p>
        </div>
      ))}
    </div>
  );
};

export default FacilityList;
