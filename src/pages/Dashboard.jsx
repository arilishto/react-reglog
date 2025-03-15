import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
    const [courses, setCourses] = useState([]);
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/v1/courses`)
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch((error) => console.error('Ошибка загрузки курсов:', error));
    }, []);

    return (
        <div><Header />
        <div className={styles['dashboard-container']}>   

            {/*<div className={styles['main-content']}>
                <div className={styles['courses-grid']}>
                    {courses.map((course) => (
                        <div key={course.id} className={styles['course-card']}>
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                            <button className={styles['course-btn']}>Подробнее</button>
                        </div>
                    ))}
                </div>*/}
                <div className={styles['courses-grid']}>
                        <div className={styles['course-card']}>
                            <h3>Робототехника с нуля</h3>
                            <p>Робототехника объединяет инженерию, программирование и искусственный интеллект для создания умных машин.</p>
                            <button className={styles['course-btn']}>Подробнее</button>
                        </div>
                        <div className={styles['course-card']}>
                            <h3>Астрономия для лохов</h3>
                            <p>Астрономия изучает звёзды, планеты, галактики и вселенную, раскрывая тайны космоса и нашего места в нём.</p>
                            <button className={styles['course-btn']}>Подробнее</button>
                        </div>
                        <div className={styles['course-card']}>
                            <h3>Конкурс "Лучший программист"</h3>
                            <p>Конкурс "Лучший программист" собирает талантливых разработчиков, чтобы проверить их навыки в решении сложных задач, креативность и скорость написания кода. Победители получают признание, призы и возможности для карьерного роста.</p>
                            <button className={styles['course-btn']}>Подробнее</button>
                        </div>
                </div>
                

            </div>
        </div>
    );
};

export default Dashboard;