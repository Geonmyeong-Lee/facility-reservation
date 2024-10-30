import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "./MyInformation.module.css";

const MyInformation = () => {
  const defaultName = "John Doe";
  const defaultPassword = "00000000";
  const defaultImage = "/AssignImages/user.png";
  const [name, setName] = useState(localStorage.getItem("userName") || defaultName);
  const [password, setPassword] = useState(localStorage.getItem("userPassword") || defaultPassword);
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || defaultImage);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setProfileImage(result);
        localStorage.setItem("profileImage", result);
        setShowImageModal(false);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleNameChange = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", name);
    setShowNameModal(false);
  };
  const handlePasswordChange = (e) => {
    e.preventDefault();
    localStorage.setItem("userPassword", password);
    setShowPasswordModal(false);
  };

  return (
    <div className={styles["profile-container"]}>
      <h2>User Information</h2>
      <div>
        <img className={styles["profile-image"]} src={profileImage} alt="Profile" width="200px" height="200px" />
        <br />
        <Button className={styles["button"]} onClick={() => setShowImageModal(true)}>Change Image</Button>
      </div>
      <div>
        <p>Email: abc@stonybrook.edu</p>
        <p>Name: {name}</p>
        <Button className={styles["button"]} onClick={() => setShowNameModal(true)}>Change Name</Button>
      </div>
      <div>
        <p>Password: {password}</p>
        <Button className={styles["button"]} onClick={() => setShowPasswordModal(true)}>Change Password</Button>
      </div>

      <Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change your image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>New Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showNameModal} onHide={() => setShowNameModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change your name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleNameChange}>
            <Form.Group>
              <Form.Label>New Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter new name"
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowNameModal(false)}>Close</Button>
              <Button variant="primary" type="submit">Save Changes</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change your password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePasswordChange}>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>Close</Button>
              <Button variant="primary" type="submit">Save Changes</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MyInformation;
;