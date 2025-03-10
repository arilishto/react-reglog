import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import PersonalAccount from './components/PersonalAccount';


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <BrowserRouter>
        
            <Routes>
                {/* Главная страница (Dashboard) — доступна всем */}
                <Route
                    path="/"
                    element={<Dashboard isAuthenticated={isAuthenticated} />}
                />

                {/* Страница авторизации */}
                <Route
                    path="/auth"
                    element={<AuthForm setIsAuthenticated={setIsAuthenticated} />}
                />

                <Route
                    path="/personal-account"
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                    <PersonalAccount />
                    </PrivateRoute>
                    }
                />
                
            </Routes>
        </BrowserRouter>
    );
}

export default App;