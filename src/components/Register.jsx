import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";

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

        if (!token) {
          setMessage('Ошибка: токен не получен');
          return;
        }

        localStorage.setItem('token', token);
        setIsAuthenticated(true); 
        navigate('/personal-account');
        setMessage('Регистрация успешна');
      } else {
        let errorMessage = 'Ошибка регистрации';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          console.error('Ошибка при парсинге ответа:', e);
        }
        setMessage(errorMessage);
      }
    } catch (error) {
      console.error('Ошибка соединения:', error);
      setMessage('Ошибка соединения с сервером. Пожалуйста, проверьте подключение к интернету.');
    }
  };

  return (
      <div className="form signup">
        <span className="title">Регистрация</span>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
                type="text"
                name="username"
                className="username"
                placeholder="Введите имя пользователя"
                value={formData.username}
                onChange={handleChange}
                required
            />
            <i className="uil uil-user-circle"></i>
          </div>
          <div className="input-field">
            <input
                type="email"
                name="email"
                className="email"
                placeholder="Введите адрес электронной почты"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <i className="uil uil-at icon"></i>
          </div>
          <div className="input-field">
            <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="password"
                placeholder="Придумайте пароль..."
                value={formData.password}
                onChange={handleChange}
                required
            />
            <i className="uil uil-lightbulb-alt"></i>
            <i
                className={`uil ${showPassword ? 'uil-eye' : 'uil-eye-slash'} showHidePw`}
                onClick={togglePasswordVisibility}
            ></i>
          </div>
          <div className="input-field">
            <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                className="confirmPassword"
                placeholder="...и подтвердите его"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
            />
            <i className="uil uil-keyhole-circle icon"></i>
            <i
                className={`uil ${showPassword ? 'uil-eye' : 'uil-eye-slash'} showHidePw`}
                onClick={togglePasswordVisibility}
            ></i>
          </div>
          <div className="checkbox-text">
            <div className="checkbox-content">
              <input
                  type="checkbox"
                  id="regCheck"
                  checked={rememberMe}
                  onChange={handleCheckboxChange}
              />
              <label htmlFor="regCheck" className="text">
                Запомни меня
              </label>
            </div>
          </div>
          <div className="input-field button">
            <input type="submit" value="Зарегистрироваться" />
          </div>
        </form>

        {message && <p className="message">{message}</p>}

        <div className="login-signup">
        <span className="text">
          <button onClick={toggleForm} className="text-button login-link">
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