import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import TaskDetails from '../components/TaskDetails';
import { ChevronDown, ChevronRight } from 'lucide-react';

const TodoPage = ({ isCardView, toggleViewMode, darkMode }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState('');
  const tasks = useSelector(state => state.tasks.tasks);
  const searchQuery = useSelector(state => state.tasks.searchQuery);

  const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const toggleInputVisibility = () => {
    setInputVisible(!inputVisible);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setDrawerOpen(true);
  };

  const handleCloseTaskDetails = () => {
    setSelectedTask(null);
    setDrawerOpen(false);
    setDrawerContent('');
  };

  return (
    <div className={`flex-1 p-6 ${darkMode ? 'bg-[#222223] text-white' : 'bg-white text-black'}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>Todo</span>
          <button onClick={toggleInputVisibility} className={`text-gray-700 ${darkMode ? 'text-white' : 'text-black'}`}>
            {inputVisible ? <ChevronDown className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-black'}`} /> : <ChevronRight className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-black'}`} />}
          </button>
        </div>
      </div>
      {inputVisible && (
        <>
          <div className="border-t border-[#9ebf9f] my-4"></div>
          <TaskInput
            isDrawerOpen={isDrawerOpen}
            setDrawerOpen={setDrawerOpen}
            setDrawerContent={setDrawerContent}
            darkMode={darkMode}
          />
        </>
      )}
      <div className="border-t border-[#9ebf9f] my-4"></div>
      <TaskList onTaskClick={handleTaskClick} selectedTask={selectedTask} isCardView={isCardView} darkMode={darkMode} tasks={filteredTasks} />
      {isDrawerOpen && selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={handleCloseTaskDetails}
          darkMode={darkMode}
          drawerContent={drawerContent}
        />
      )}
    </div>
  );
};

export default TodoPage;