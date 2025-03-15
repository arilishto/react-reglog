import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={styles['main-nav']}>
                <Link to="/" className={styles['dashboard-btn']}>
                    Главная страница
                </Link>
                <span className={styles.separator}>|</span>
                <Link to="/auth" className={styles['nav-profile']}>
                    Личный кабинет
                </Link>
                <span className={styles.separator}>|</span>
                <Link to="/support" className={styles['support-btn']}>
                    Поддержка
                </Link>
            </nav>
        </header>
    );
};

export default Header;