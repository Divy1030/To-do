import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Calendar as CalendarIcon, Bell, Repeat, Star, X, Trash2, UserCheck, Sun } from 'lucide-react';
import { toggleComplete, toggleImportant, deleteTask, setReminder, setDueDate, assignToSelf, addTask, fetchWeather } from '../redux/taskSlice';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

const TaskDetails = ({ task, onClose, darkMode }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reminderTime, setReminderTime] = useState(moment());
  const [dueDate, setDueDate] = useState(moment());
  const [isOutdoor, setIsOutdoor] = useState(task.isOutdoor || false);
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const weather = useSelector(state => state.tasks.weather);
  const currentTask = tasks.find(t => t.id === task.id);

  const handleToggleComplete = () => {
    dispatch(toggleComplete(task.id));
  };

  const handleToggleImportant = () => {
    dispatch(toggleImportant(task.id));
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id));
    onClose();
  };

  const handleSetReminder = () => {
    if (reminderTime.isValid()) {
      dispatch(setReminder({ taskId: task.id, reminderTime: reminderTime.toISOString() }));
      toast.success('Reminder created successfully');
    } else {
      toast.error('Invalid reminder time');
    }
  };

  const handleSetDueDate = () => {
    if (dueDate.isValid()) {
      dispatch(setDueDate({ taskId: task.id, dueDate: dueDate.toISOString() }));
      toast.success('Due date set successfully');
    } else {
      toast.error('Invalid due date');
    }
  };

  const handleAssignToSelf = () => {
    dispatch(assignToSelf(task.id));
  };

  const handleRepeatTask = () => {
    const newTask = {
      ...task,
      id: undefined, // Let the reducer generate a new ID
      createdDate: new Date().toISOString(),
      isOutdoor,
    };
    dispatch(addTask(newTask));
    toast.success('Task repeated successfully');
  };

  const handleToggleOutdoor = () => {
    setIsOutdoor(!isOutdoor);
    if (!isOutdoor && location) {
      dispatch(fetchWeather(location));
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleFetchWeather = () => {
    if (location) {
      dispatch(fetchWeather(location));
    }
  };

  useEffect(() => {
    if (currentTask) {
      setReminderTime(moment(currentTask.reminderTime));
      setDueDate(moment(currentTask.dueDate));
      setIsOutdoor(currentTask.isOutdoor || false);
    }
  }, [currentTask]);

  return (
    <div className={`fixed inset-y-0 right-0 w-80 ${darkMode ? 'bg-[#2d2c2d] text-white' : 'bg-[#eef6ef]'} shadow-lg transform transition-transform duration-500 ease-in-out mt-16`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
          <div className="flex items-center space-x-3">
            <input 
              type="checkbox" 
              checked={currentTask.completed}
              onChange={handleToggleComplete}
              className={`w-5 h-5 border-gray-300 rounded ${darkMode ? 'bg-[#347837]' : ''}`}
            />
            <span>{currentTask.title}</span>
          </div>
          <button onClick={handleToggleImportant} className="focus:outline-none">
            <Star className={`w-5 h-5 ${currentTask.important ? 'fill-current' : 'text-gray-400'} ${darkMode ? 'text-white' : 'text-black'}`} />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <button className={`w-full p-4 flex items-center space-x-3 ${darkMode ? 'text-white hover:bg-[#222223]' : 'text-gray-700 hover:bg-gray-50'}`}>
              <Plus className="w-5 h-5" />
              <span>Add Step</span>
            </button>
          </div>

          <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <button className={`w-full p-4 flex items-center space-x-3 ${darkMode ? 'text-white hover:bg-[#222223]' : 'text-gray-700 hover:bg-gray-50'}`} onClick={() => setShowTimePicker(!showTimePicker)}>
              <Bell className="w-5 h-5" />
              <span>Set Reminder</span>
            </button>
            {showTimePicker && (
              <div className={`p-4 ${darkMode ? 'bg-[#2d2c2d]' : 'bg-white'} rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <Datetime
                  value={reminderTime}
                  onChange={setReminderTime}
                  dateFormat={false}
                  className={`w-full ${darkMode ? 'bg-[#2d2c2d] text-white' : 'bg-white text-black'} p-2 rounded-lg`}
                />
                <button onClick={handleSetReminder} className={`mt-2 px-4 py-2 rounded-lg ${darkMode ? 'bg-[#347136] text-white' : 'bg-[#f4fcf6] text-[#347837] hover:bg-green-200'}`}>
                  Set
                </button>
              </div>
            )}
          </div>

          <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <button className={`w-full p-4 flex items-center space-x-3 ${darkMode ? 'text-white hover:bg-[#222223]' : 'text-gray-700 hover:bg-gray-50'}`} onClick={() => setShowCalendar(!showCalendar)}>
              <CalendarIcon className="w-5 h-5" />
              <span>Add Due Date</span>
            </button>
            {showCalendar && (
              <div className={`p-4 ${darkMode ? 'bg-[#2d2c2d]' : 'bg-white'} rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <Datetime
                  value={dueDate}
                  onChange={setDueDate}
                  timeFormat={false}
                  className={`w-full ${darkMode ? 'bg-[#2d2c2d] text-white' : 'bg-white text-black'} p-2 rounded-lg`}
                />
                <button onClick={handleSetDueDate} className={`mt-2 px-4 py-2 rounded-lg ${darkMode ? 'bg-[#347136] text-white' : 'bg-[#f4fcf6] text-[#347837] hover:bg-green-200'}`}>
                  Set
                </button>
              </div>
            )}
          </div>

          <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <button className={`w-full p-4 flex items-center space-x-3 ${darkMode ? 'text-white hover:bg-[#222223]' : 'text-gray-700 hover:bg-gray-50'}`} onClick={handleRepeatTask}>
              <Repeat className="w-5 h-5" />
              <span>Repeat</span>
            </button>
          </div>

          <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-4 flex items-center space-x-3`}>
            <UserCheck className="w-5 h-5" />
            <span>Assigned to Myself</span>
            <input
              type="checkbox"
              checked={currentTask.assignedTo === 'myself'}
              onChange={handleAssignToSelf}
              className={`w-5 h-5 border-gray-300 rounded ${darkMode ? 'bg-[#347837]' : ''}`}
            />
          </div>

          <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-4 flex items-center space-x-3`}>
            <Sun className="w-5 h-5" />
            <span>Outdoor Activity</span>
            <input
              type="checkbox"
              checked={isOutdoor}
              onChange={handleToggleOutdoor}
              className={`w-5 h-5 border-gray-300 rounded ${darkMode ? 'bg-[#347837]' : ''}`}
            />
          </div>

          {isOutdoor && (
            <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-4`}>
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={location}
                  onChange={handleLocationChange}
                  placeholder="Enter location"
                  className={`w-full bg-transparent border-none ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-600 placeholder-gray-500'} focus:outline-none`}
                />
                <button onClick={handleFetchWeather} className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-[#347136] text-white' : 'bg-[#f4fcf6] text-[#347837] hover:bg-green-200'}`}>
                  Get Weather
                </button>
              </div>
            </div>
          )}

          {isOutdoor && weather && (
            <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-4`}>
              <div className="flex items-center space-x-3">
                <span>Current Weather:</span>
                <span>{weather.current.condition.text}</span>
                <img src={weather.current.condition.icon} alt="weather icon" />
                <span>{weather.current.temp_c}°C</span>
              </div>
            </div>
          )}

          <div className="p-4">
            <input
              type="text"
              placeholder="Add Notes"
              className={`w-full bg-transparent border-none ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-600 placeholder-gray-500'} focus:outline-none`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-auto border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-4 flex justify-between items-center`}>
          <button onClick={onClose} className={`text-gray-600 ${darkMode ? 'text-white' : 'text-black'}`}>
            <X className="w-5 h-5" />
          </button>
          <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-500'}`}>Created Today</span>
          <button onClick={handleDeleteTask} className={`text-gray-600 ${darkMode ? 'text-white' : 'text-black'}`}>
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;