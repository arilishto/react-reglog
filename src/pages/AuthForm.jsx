import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import styles from '../styles/AuthForm.module.css';

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
    <div className={`${styles.container} ${isRegisterActive ? styles.active : ''}`}>
      <div className={styles.forms}>
        <div className={`${styles.form} ${styles.login}`}>
          <Login 
            toggleForm={handleSwitchForm} 
            togglePasswordVisibility={togglePasswordVisibility}
            showPassword={showPassword} 
            setIsAuthenticated={setIsAuthenticated}
          />
        </div>
        <div className={`${styles.form} ${styles.signup}`}>
          <Register 
            toggleForm={handleSwitchForm} 
            togglePasswordVisibility={togglePasswordVisibility}
            showPassword={showPassword} 
            setIsAuthenticated={setIsAuthenticated}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

