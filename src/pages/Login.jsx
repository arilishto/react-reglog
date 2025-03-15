import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";

const Login = ({ toggleForm, togglePasswordVisibility, showPassword, setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

    try {
      const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          }
      );

      if (response.ok) {
        const data = await response.json();
        const { token } = data;

        // Сохраняем токен в localStorage
        localStorage.setItem('token', token);

        setIsAuthenticated(true); 
        
        navigate('/personal-account');
        setMessage('Успешный вход');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Ошибка при входе');
      }
    } catch (error) {
      console.error('Ошибка соединения:', error);
      setMessage('Ошибка соединения');
    }
  };

  return (
      <div className="form login">
        <span className="title">Вход</span>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
                type="email"
                name="email"
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
                placeholder="Введите пароль"
                value={formData.password}
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
                  id="logCheck"
                  checked={rememberMe}
                  onChange={handleCheckboxChange}
              />
              <label htmlFor="logCheck" className="text">Запомни меня</label>
            </div>
            <a href="#" className="text">Я забыл(а) пароль!</a>
          </div>
          <div className="input-field button">
            <input type="submit" value="Войти" />
          </div>
        </form>

        {message && <p className="message">{message}</p>}

        <div className="login-signup">
        <span className="text">
          <button onClick={toggleForm} className="text-button signup-link">
            Хочу зарегистрироваться!
          </button>
        </span>
        </div>
      </div>
  );
};

Login.propTypes = {
  toggleForm: PropTypes.func.isRequired,
  togglePasswordVisibility: PropTypes.func.isRequired,
  showPassword: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Login;