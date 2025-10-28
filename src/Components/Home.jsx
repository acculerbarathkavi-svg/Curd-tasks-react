import React, { useState } from 'react'
import './home.css'
import swal from 'sweetalert2'
const home = () => {
    const [UserDetails , setUserDetails] = useState({
    username: '',
    email: '',
    age: '',
    dob: '',
    file: ''
  });

     const [submitted, setSubmitted] = useState(null);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
        
      }));
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Submitted User Details:', UserDetails);

      setUserDetails({ // Clear the form after submission
        username: '',
        email: '',
        age: '',
        dob: '',
      });
      setSubmitted(UserDetails);//

      swal.fire({
        title: 'Success!',
        text: 'Your details have been submitted.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }
    
  return (
    <div>
        <h1>Enter Your Details</h1>
        <form onSubmit={handleSubmit}>
       <div className="field">
        <label>UserName</label>
        <input type="text" name='username' 
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
        <input type="text" name='email' 
        placeholder='User Email id' 
        value={UserDetails.email}
        onChange={handleChange}
        required
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            title="Enter a valid email address"
        />
       </div>
       <div className="field">
        <label>Age</label>
        <input type="text" name='age' 
        placeholder='User Age' 
        value={UserDetails.age}
        onChange={handleChange}
        required
            min="1"
            max="120"
            title="Age must be between 1 and 120"/>
       </div>
       <div className="field">
        <label>DOB</label>
        <input type="date" name='dob' 
        placeholder='User DOB' 
        value={UserDetails.dob}
        onChange={handleChange}
        required
        />
       </div>
       <div className="field">
        <label>Image</label>
        <input type="file" name='image' 
        placeholder='User image' 
        value={UserDetails.file}
        onChange={handleChange}
        required
        />
       </div>

       <button type='submit'>Submit</button>
         </form>
         {submitted && (
          <div className="submitted-details">
            <h2>Submitted Details:</h2>
            <p><strong>Username:</strong> {submitted.username}</p>
            <p><strong>Email:</strong> {submitted.email}</p>
            <p><strong>Age:</strong> {submitted.age}</p>  
            <p><strong>DOB:</strong> {submitted.dob}</p>
          </div>
        )}
    </div>
  )
}

export default home