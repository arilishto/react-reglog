import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthForm from './pages/AuthForm';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './pages/PrivateRoute';
import PersonalAccount from './pages/PersonalAccount';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <BrowserRouter>
            <Routes>
                {/* Главная страница (Dashboard) — доступна всем */}
                <Route path="/" element={<Dashboard isAuthenticated={isAuthenticated} />} />

                {/* Страница авторизации */}
                <Route path="/auth" element={<AuthForm setIsAuthenticated={setIsAuthenticated} />} />

                {/* Личный кабинет */}
                <Route element={<PrivateRoute />}>
                    <Route path="/personal-account" element={<PersonalAccount />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;