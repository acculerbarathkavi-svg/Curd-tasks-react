import React, { useState, useEffect } from 'react';
import './home.css';
import swal from 'sweetalert2';
import { Card } from 'react-bootstrap';

const Home = () => {
  const [UserDetails, setUserDetails] = useState({
    username: '',
    email: '',
    age: '',
    dob: '',
  });

  const [submitted, setSubmitted] = useState(null);
  const [userList, setUserList] = useState([]);

  // 🔹 Load all stored data from localStorage when the page loads
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('UserDetailsList')) || [];
    setUserList(storedUsers);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem('UserDetailsList')) || [];
    const updatedUsers = [...existingUsers, UserDetails];
    localStorage.setItem('UserDetailsList', JSON.stringify(updatedUsers));

    setUserDetails({
      username: '',
      email: '',
      age: '',
      dob: '',
    });

    setUserList(updatedUsers); // Update list immediately
    setSubmitted(UserDetails);

    swal.fire({
      title: 'Success!',
      text: 'Your details have been submitted.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  return (
    <div>
      <Card style={{ marginTop: "60px", padding: "20px" }}>
        <h1>Enter Your Details</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>UserName</label>
            <input
              type="text"
              name='username'
              placeholder='User Name'
              value={UserDetails.username}
              onChange={handleChange}
              required
              pattern="[A-Za-z ]+"
              title="Username must contain only letters"
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name='email'
              placeholder='User Email id'
              value={UserDetails.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Age</label>
            <input
              type="number"
              name='age'
              placeholder='User Age'
              value={UserDetails.age}
              onChange={handleChange}
              required
              min="1"
              max="120"
            />
          </div>

          <div className="field">
            <label>DOB</label>
            <input
              type="date"
              name='dob'
              value={UserDetails.dob}
              onChange={handleChange}
              required
            />
          </div>

          <button type='submit'>Submit</button>
        </form>

        {/* 🔹 Show All Stored Data in List */}
        {userList.length > 0 && (
          <div className="all-data" style={{ marginTop: "30px" }}>
            <h2>All Stored User Details</h2>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {userList.map((user, index) => (
                <li key={index} style={{
                  background: "#f8f9fa",
                  margin: "10px 0",
                  padding: "15px",
                  borderRadius: "10px",
                  boxShadow: "0px 2px 4px rgba(0,0,0,0.1)"
                }}>
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Age:</strong> {user.age}</p>
                  <p><strong>DOB:</strong> {user.dob}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Home;
