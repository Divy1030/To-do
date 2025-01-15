import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Plus, Calendar as CalendarIcon, Bell, Repeat as RepeatIcon, Star } from 'lucide-react';

const TaskDetails = ({ task, onClose }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-96 rounded-lg">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <input type="checkbox" className="w-5 h-5" />
            <span>{task.title}</span>
          </div>
          <Star className="w-5 h-5 text-gray-400" />
        </div>

        <div className="p-4 space-y-4">
          <button className="flex items-center space-x-2 text-gray-600">
            <Plus className="w-5 h-5" />
            <span>Add Step</span>
          </button>

          <button 
            className="flex items-center space-x-2 text-gray-600"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <CalendarIcon className="w-5 h-5" />
            <span>Add Due Date</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-600">
            <Bell className="w-5 h-5" />
            <span>Set Reminder</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-600">
            <RepeatIcon className="w-5 h-5" />
            <span>Repeat</span>
          </button>

          {showCalendar && (
            <div className="border rounded-lg p-4">
              <Calendar value={new Date(task.dueDate)} />
            </div>
          )}
        </div>

        <div className="p-4 border-t flex justify-between">
          <span className="text-sm text-gray-500">Created Today</span>
          <div className="space-x-4">
            <button onClick={onClose}>❌</button>
            <button>🗑️</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;