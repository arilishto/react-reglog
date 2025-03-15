import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";
import styles from '../styles/AuthForm.module.css';

const Register = ({ toggleForm, togglePasswordVisibility, showPassword, setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage('Пароли не совпадают');
      return;
    }

    try {
      const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/register`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: formData.username,
              email: formData.email,
              password: formData.password,
            }),
          }
      );

      if (response.ok) {
        const data = await response.json();
        const { token } = data;

        // localStorage
        localStorage.setItem('token', token);

        setIsAuthenticated(true); 

        navigate('/personal-account');
        setMessage('Регистрация успешна');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Ошибка регистрации');
      }
    } catch (error) {
      console.error('Ошибка соединения:', error);
      setMessage('Ошибка соединения');
    }
  };

  return (
      <div>
        <span className={styles.title}>Регистрация</span>
        <form onSubmit={handleSubmit}>
          <div className={styles['input-field']}>
            <input
                type="text"
                name="username"
                placeholder="Введите имя пользователя"
                value={formData.username}
                onChange={handleChange}
                required
            />
            <i className={`uil uil-user-circle ${styles.icon}`}></i>
          </div>
          <div className={styles['input-field']}>
            <input
                type="email"
                name="email"
                placeholder="Введите адрес электронной почты"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <i className={`uil uil-at ${styles.icon}`}></i>
          </div>
          <div className={styles['input-field']}>
            <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Придумайте пароль..."
                value={formData.password}
                onChange={handleChange}
                required
            />
            <i className={`uil uil-lightbulb-alt ${styles.icon}`}></i>
            <i
                className={`uil ${showPassword ? 'uil-eye' : 'uil-eye-slash'} ${styles.showHidePw}`}
                onClick={togglePasswordVisibility}
            ></i>
          </div>
          <div className={styles['input-field']}>
            <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="...и подтвердите его"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
            />
            <i className={`uil uil-keyhole-circle ${styles.icon}`}></i>
            <i
                className={`uil ${showPassword ? 'uil-eye' : 'uil-eye-slash'} ${styles.showHidePw}`}
                onClick={togglePasswordVisibility}
            ></i>
          </div>
          <div className={styles['checkbox-text']}>
            <div className={styles['checkbox-content']}>
              <input
                  type="checkbox"
                  id="regCheck"
                  checked={rememberMe}
                  onChange={handleCheckboxChange}
              />
              <label htmlFor="regCheck" className={styles.text}>
                Запомни меня
              </label>
            </div>
          </div>
          <div className={`${styles['input-field']} ${styles.button}`}>
            <input type="submit" value="Зарегистрироваться" />
          </div>
        </form>

        {message && <p className={styles.message}>{message}</p>}

        <div className={styles['login-signup']}>
          <span className={styles.text}>
            <button onClick={toggleForm} className={styles['text-button']}>
              Я уже зарегистрирован(а)!
            </button>
          </span>
        </div>
      </div>
  );
};

Register.propTypes = {
  toggleForm: PropTypes.func.isRequired,
  togglePasswordVisibility: PropTypes.func.isRequired,
  showPassword: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Register;