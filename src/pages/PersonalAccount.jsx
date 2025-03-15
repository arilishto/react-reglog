import React, { useState } from 'react';

const UserProfile = () => {
  const [firstName, setFirstName] = useState('Иван');
  const [lastName, setLastName] = useState('Иванов');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    if (name === 'firstName') {
      setFirstName(value);
    } else if (name === 'lastName') {
      setLastName(value);
    }
  };

  const handleNotificationsChange = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Личный кабинет</h1>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Имя:
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleNameChange}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Фамилия:
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleNameChange}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Уведомления:
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={handleNotificationsChange}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
      <div>
        <h2>Текущие данные:</h2>
        <p>Имя: {firstName}</p>
        <p>Фамилия: {lastName}</p>
        <p>Уведомления: {notificationsEnabled ? 'Включены' : 'Отключены'}</p>
      </div>
    </div>
  );
};

export default UserProfile;