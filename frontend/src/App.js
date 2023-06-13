import React, { useState } from 'react';
import { Login } from './Pages/Login';
import { Admin } from './Pages/Admin';
import { User } from './Pages/User';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Handle login event
  const handleLogin = (res) => {
    const idUsers = res.user.idUsers;
    const username = res.user.username;
    const role = res.user.role;
    

  // Perform authentication logic here and set isLoggedIn and isAdmin accordingly
  // For demonstration purposes, assume successful login and user role detection
    setIsLoggedIn(true);
    if(role == 'ADMIN'){
      setIsAdmin(true);
    }
    
  };

  // Handle logout event
  const handleLogout = () => {
    // Perform logout logic here and reset isLoggedIn and isAdmin
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : isAdmin ? (
        <Admin/>
      ) : (
        <User/>
      )}
    </div>
  );
}

export default App;
