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

    setUserDetails({ username: '', email: '', age: '', dob: '' });
    setUserList(updatedUsers);
    setSubmitted(UserDetails);

    swal.fire({
      title: 'Success!',
      text: 'Your details have been submitted.',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  return (
    <div className="container">
      <Card className="form-card">
        <h1>Enter Your Details</h1>
        <form onSubmit={handleSubmit} className="form-box">
          <div className="field">
            <label>UserName</label>
            <input type="text" name="username" placeholder="User Name" value={UserDetails.username} onChange={handleChange} required pattern="[A-Za-z ]+" />
          </div>

          <div className="field">
            <label>Email</label>
            <input type="email" name="email" placeholder="User Email" value={UserDetails.email} onChange={handleChange} required />
          </div>

          <div className="field">
            <label>Age</label>
            <input type="number" name="age" placeholder="User Age" value={UserDetails.age} onChange={handleChange} required min="1" max="120" />
          </div>

          <div className="field">
            <label>DOB</label>
            <input type="date" name="dob" value={UserDetails.dob} onChange={handleChange} required />
          </div>

          <button type="submit">Submit</button>
        </form>

        {userList.length > 0 && (
          <div className="all-data">
            <h2>All Stored User Details</h2>
            <ul>
              {userList.map((user, index) => (
                <li key={index} className="list-item">
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
