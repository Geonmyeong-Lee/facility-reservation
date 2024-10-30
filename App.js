import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import FacilityList from './components/FacilityList';
import Reservation from './components/Reservation';
import MyReservation from './components/MyReservation';
import MyInformation from './components/MyInformation';
import './App.css';

function App() {
  const defaultProfileImage = '/AssignImages/user.png';
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || defaultProfileImage);
  
  return (
    	<Router>
      		<div className="App">
        		<nav className="navbar">
          			<div className="navbar-left">
						<Link to ="/">
							<img src="/AssignImages/home-icon.png" alt="Home" className="home-icon"/></Link>
					</div>
					<div className="navbar-center">
						<ul className="navbar-list">
							<li><Link to="/facility-list">Facility List</Link></li>
							<li><Link to="/reservation">Reservation</Link></li>
							<li className="user-menu">
								<li>User &#x25BC;</li>
								<div className="dropdown-content">
									<Link to="/my-information">My Information</Link>
									<Link to="/my-reservation">My Reservation</Link>
								</div>
							</li>
						</ul>
					</div>	
					<div className="navbar-right">
						<img className="profile-image" src={profileImage} alt="Profile"/>
					</div>
        		</nav>

        	<Routes>
          		<Route path="/" element={<Home />} />
          		<Route path="/facility-list" element={<FacilityList />} />
          		<Route path="/reservation" element={<Reservation />} />
          		<Route path="/my-reservation" element={<MyReservation />} />
          		<Route path="/my-information" element={<MyInformation />} />
        	</Routes>
      	</div>
    </Router>
  );
};
export default App;