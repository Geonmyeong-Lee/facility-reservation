import React, { useState, useEffect } from "react";

const Home = () => {
	const [userName, setUserName] = useState(localStorage.getItem("userName") || "John Doe");
	const [deletedReservation, setDeletedReservation] = useState(null);

	useEffect(() => {
	  const recentDeletedReservation = JSON.parse(localStorage.getItem("deletedReservation"));
	  if (recentDeletedReservation) {
		setDeletedReservation(recentDeletedReservation);
	  }
	}, []);

	return (
		<div>
			<div className="Main-Instruction">
				<h1 className="Main-header">&#183;Facility Reservation</h1>
				<p className="Main-InstructionContent">1. Reservation Date should be the date after today</p>
				<p className="Main-InstructionContent">2. The number of users should be between the maximum number of people and the minumum number of people.</p>
				<p className="Main-InstructionContent">3. If the facility is available only for SUNY Korea, user should be in SUNY Korea</p>
				<p className="Main-InstructionContent">4. The reservation date must be made on the available day of the week</p>
				<p className="Main-InstructionContent">5. The same person cannot book another facility on the same date.</p>
				<p className="Main-InstructionContent-Indent">If all conditions are met, data is stored in local storage.</p>
			</div>
			<div className="Main-UserInfo">
				<h2 className="WelcomeState">&#183;User Information</h2>
				<p className="Main-InstructionContent">1. User profile, user email, user password, user name</p>
				<p className="Main-InstructionContent">2. All other details can be modified except for the user email.</p>
				<p className="Main-InstructionContent">3. If the user profile is changed, the image in the navbar will also change.</p>
				<h3 className="WelcomeState">&#183;ReservationHistory</h3>
				<p className="Main-InstructionContent">Load the reservation data stored in the local storage</p>
				<p className="Main-InstructionContent">reservation id, facility name, purpose, peopleNum isSUNY, booker name, date</p>
				<p className="Main-InstructionContent">Can caancel reservation</p>
			</div>
		</div>
  )
}
export default Home;