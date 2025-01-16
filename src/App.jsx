import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import TaskDetails from './components/TaskDetails';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [selectedTask, setSelectedTask] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [darkMode, setDarkMode] = useState(false); // Set initial mode to light mode
  const [isCardView, setIsCardView] = useState(false);

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
    document.body.classList.toggle('dark-mode', !darkMode);
    document.body.classList.toggle('light-mode', darkMode);
  };

  const toggleViewMode = () => {
    setIsCardView(!isCardView);
  };

  return (
    <Router>
      <div className={`flex flex-col h-screen ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <Navbar
          toggleSidebar={toggleSidebar}
          toggleDarkMode={toggleDarkMode}
          toggleViewMode={toggleViewMode}
          isCardView={isCardView}
          darkMode={darkMode}
        />
        <div className="flex flex-1 overflow-hidden">
          {sidebarVisible && <Sidebar onTaskClick={handleTaskClick} darkMode={darkMode} toggleSidebar={toggleSidebar} />}
          <div className={`flex-1 overflow-y-auto ${sidebarVisible ? 'hidden sm:block' : ''}`}>
            <Routes>
              <Route path="/" element={isAuthenticated ? <Navigate to="/todo" /> : <Navigate to="/login" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/todo"
                element={isAuthenticated ? <TodoPage isCardView={isCardView} toggleViewMode={toggleViewMode} darkMode={darkMode} /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
          {selectedTask && <TaskDetails task={selectedTask} onClose={handleCloseTaskDetails} darkMode={darkMode} />}
        </div>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;