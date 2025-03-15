import React, { useState, useEffect } from 'react';
import Header from './Header';
import styles from '../styles/PersonalAccount.module.css';

const UserProfile = () => {
  const [profileData, setProfileData] = useState({
    firstName: 'Иван',
    lastName: 'Иванов',
    email: 'ivan@example.com',
    about: 'Студент курсов по программированию. Интересуюсь веб-разработкой и искусственным интеллектом.',
    photo: null
  });

  const [initialData, setInitialData] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  const [courses] = useState([
    {
      id: 1,
      title: 'Робототехника с нуля',
      progress: 75,
      completed: 15,
      total: 20
    },
    {
      id: 2,
      title: 'Астрономия для начинающих',
      progress: 30,
      completed: 6,
      total: 20
    }
  ]);

  useEffect(() => {
    // При первой загрузке сохраняем начальные данные
    if (!initialData) {
      setInitialData(profileData);
    } else {
      // Проверяем, есть ли изменения
      const hasDataChanged = JSON.stringify(initialData) !== JSON.stringify(profileData);
      setHasChanges(hasDataChanged);
    }
  }, [profileData, initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          photo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoDelete = () => {
    setProfileData(prev => ({
      ...prev,
      photo: null
    }));
  };

  const handleSave = () => {
    // Здесь будет логика сохранения данных на сервер
    console.log('Сохраняем данные:', profileData);
    setInitialData(profileData); // Обновляем начальные данные
    setHasChanges(false); // Сбрасываем флаг изменений
    alert('Изменения успешно сохранены!');
  };

  return (
    <div>
      <Header />
      <div className={styles['profile-container']}>
        {/* Секция с фото профиля */}
        <div className={styles['profile-section']}>
          <div className={styles['photo-section']}>
            <div className={styles['photo-container']}>
              {profileData.photo ? (
                <img
                  src={profileData.photo}
                  alt="Фото профиля"
                  className={styles['profile-photo']}
                />
              ) : (
                <div className={styles['profile-photo']} />
              )}
            </div>
            <div className={styles['photo-actions']}>
              <label className={`${styles['photo-btn']} ${styles['upload-btn']}`}>
                Загрузить фото
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  style={{ display: 'none' }}
                />
              </label>
              {profileData.photo && (
                <button
                  className={`${styles['photo-btn']} ${styles['delete-btn']}`}
                  onClick={handlePhotoDelete}
                >
                  Удалить
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Секция с информацией */}
        <div className={styles['profile-section']}>
          <div className={styles['info-section']}>
            <div className={styles['input-group']}>
              <label>Имя</label>
              <input
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={handleInputChange}
                className={styles['input-field']}
              />
            </div>
            <div className={styles['input-group']}>
              <label>Фамилия</label>
              <input
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
                className={styles['input-field']}
              />
            </div>
            <div className={styles['input-group']}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                className={styles['input-field']}
              />
            </div>
            <div className={styles['input-group']}>
              <label>О себе</label>
              <textarea
                name="about"
                value={profileData.about}
                onChange={handleInputChange}
                className={`${styles['input-field']} ${styles['textarea-field']}`}
              />
            </div>
            <button 
              onClick={handleSave} 
              className={styles['save-button']}
              disabled={!hasChanges}
            >
              Сохранить изменения
            </button>
          </div>
        </div>

        {/* Секция с подпиской и прогрессом */}
        <div className={styles['profile-section']}>
          <div className={styles['subscription-section']}>
            <h3 className={styles['subscription-header']}>Мои курсы</h3>
            <div className={styles['courses-list']}>
              {courses.map(course => (
                <div key={course.id} className={styles['course-item']}>
                  <div className={styles['course-info']}>
                    <div className={styles['course-title']}>{course.title}</div>
                    <div className={styles['course-progress']}>
                      Завершено {course.completed} из {course.total} уроков
                    </div>
                    <div className={styles['progress-bar']}>
                      <div
                        className={styles['progress-fill']}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles['stats-grid']}>
              <div className={styles['stat-card']}>
                <div className={styles['stat-value']}>21</div>
                <div className={styles['stat-label']}>Завершено уроков</div>
              </div>
              <div className={styles['stat-card']}>
                <div className={styles['stat-value']}>4.8</div>
                <div className={styles['stat-label']}>Средняя оценка</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;