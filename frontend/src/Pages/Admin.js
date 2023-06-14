import React, { useState } from 'react';

export function Admin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role,setRole] = useState('USER');

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    // Perform API call to the admin/register route to add a new user
    fetch('http://localhost:3000/admin/register', {
      
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ username, password, role}),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the API
        console.log(data);
        // Clear the form fields
        setUsername('');
        setPassword('');
        setRole('USER');
      })
      .catch((error) => {
        // Handle any errors that occurred during the API call
        console.error(error);
      });
  };

  return (
    <div className="Auth-form-container">
  <form className="Auth-form" onSubmit={handleSubmit}>
    <div className="Auth-form-content">
      <h3 className="Auth-form-title">Add New User</h3>
      <div className="form-group mt-3">
        <label>Username</label>
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group mt-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control mt-1"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group mt-3">
            <label>Role</label>
            <select
              className="form-control mt-1"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
        </div>
      <div className="d-grid gap-2 mt-3 mb-3">
        <button type="submit" className="btn btn-primary">
          Add User
        </button>
      </div>
    </div>
  </form>
</div>

  );
}

export default Admin;
