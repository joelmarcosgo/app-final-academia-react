import React from 'react';
import { Routes } from './routes';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';

export default function  UseContextsApp() {    
    return (
        <AuthProvider>
            <TaskProvider>
                <Routes />
            </TaskProvider>
        </AuthProvider>
    );
}