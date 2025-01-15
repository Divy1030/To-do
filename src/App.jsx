import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';
import './App.css';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [selectedTask, setSelectedTask] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseTaskDetails = () => {
    setSelectedTask(null);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', darkMode);
    document.body.classList.toggle('light-mode', !darkMode);
  };

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Navbar toggleSidebar={toggleSidebar} toggleDarkMode={toggleDarkMode} />
      <div className="flex flex-1">
        {sidebarVisible && <Sidebar onTaskClick={handleTaskClick} />}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<TodoPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/todo"
              element={isAuthenticated ? <TodoPage /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
        {selectedTask && <TaskDetails task={selectedTask} onClose={handleCloseTaskDetails} />}
      </div>
    </div>
  );
};

export default App;