import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const Dashboard = () => {
    const [courses, setCourses] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/v1/courses`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch((error) => console.error('Ошибка загрузки курсов:', error));
    }, []);


    return (
        <div className="dashboard-container">
            <Header />

            {/* Список курсов */}
            <div className="courses-grid">
                {courses.map((course) => (
                    <div key={course.id} className="course-card">
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <button className="course-btn">Подробнее</button>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Dashboard;