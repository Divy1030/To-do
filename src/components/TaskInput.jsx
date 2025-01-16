import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice';
import { Bell, RotateCcw, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskInput = ({ isDrawerOpen, setDrawerOpen, setDrawerContent, darkMode }) => {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask({ title: task, completed: false, important: false }));
      setTask('');
    }
  };

  const handleOpenReminder = () => {
    if (task.trim()) {
      setDrawerOpen(true);
      setDrawerContent('reminder');
    } else {
      toast.error('Please add a task first');
    }
  };

  const handleOpenDueDate = () => {
    if (task.trim()) {
      setDrawerOpen(true);
      setDrawerContent('dueDate');
    } else {
      toast.error('Please add a task first');
    }
  };

  return (
    <div className={`shadow-sm ${isDrawerOpen ? 'mr-80' : ''} transition-all duration-300 ${darkMode ? 'bg-[#2e3631]' : 'bg-gradient-to-t from-[#e9f0eb] to-[#f4fcf6]'}`}>
      <div className="p-4">
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add A Task"
            className={`h-16 bg-transparent outline-none p-2 rounded-lg ${darkMode ? 'bg-[#2e3631] text-white' : 'text-gray-700'}`}
          />
          <div className="flex justify-between items-center">
            <div className={`flex items-center space-x-3 ${darkMode ? 'text-white' : 'text-gray-400'}`}>
              <Bell className={`w-5 h-5 cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`} onClick={handleOpenReminder} />
              <RotateCcw className={`w-5 h-5 cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`} />
              <Calendar className={`w-5 h-5 cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`} onClick={handleOpenDueDate} />
            </div>
            <button
              onClick={handleAddTask}
              className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-[#347136] text-white' : 'bg-[#f4fcf6] text-[#347837] hover:bg-green-200'}`}
            >
              ADD TASK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskInput;