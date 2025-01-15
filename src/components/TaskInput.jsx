import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice';
import { Bell, RotateCcw, Calendar } from 'lucide-react';

const TaskInput = () => {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask({ title: task, completed: false, important: false }));
      setTask('');
    }
  };

  return (
    <div className="bg-gradient-to-t from-[#e9f0eb] to-[#f4fcf6] shadow-sm ">
      <div className="p-4">
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add A Task"
            className="h-16 bg-transparent outline-none text-gray-700 p-2 rounded-lg"
          />
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 text-gray-400">
              <Bell className="w-5 h-5 cursor-pointer text-black" />
              <RotateCcw className="w-5 h-5 cursor-pointer text-black" />
              <Calendar className="w-5 h-5 cursor-pointer text-black" />
            </div>
            <button
              onClick={handleAddTask}
              className="px-4 py-2 bg-[#f4fcf6] text-[#347837] text rounded-lg hover:bg-green-200"
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