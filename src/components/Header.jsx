import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <nav className="main-nav">
                <Link to="/auth" className="nav-profile">
                    Личный кабинет
                </Link>
                <span className="separator">|</span>
                <Link to="/support" className="support-btn">
                    Поддержка
                </Link>
            </nav>
        </header>
    );
};

export default Header;