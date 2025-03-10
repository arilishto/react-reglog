import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const AuthForm = ({ setIsAuthenticated }) => {
  const [isRegisterActive, setIsRegisterActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSwitchForm = () => {
    setIsRegisterActive(!isRegisterActive);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  

  return (
    <div className={`container ${isRegisterActive ? 'active' : ''}`}>
      <div className="forms">
        <Login 
          toggleForm={handleSwitchForm} 
          togglePasswordVisibility={togglePasswordVisibility}
          showPassword={showPassword} 
          setIsAuthenticated={setIsAuthenticated}
        />
        <Register 
          toggleForm={handleSwitchForm} 
          togglePasswordVisibility={togglePasswordVisibility}
          showPassword={showPassword} 
          setIsAuthenticated={setIsAuthenticated}
        />
      </div>
    </div>
  );
};

export default AuthForm;

