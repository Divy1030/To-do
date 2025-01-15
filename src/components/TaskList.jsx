import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleComplete, toggleImportant, deleteTask } from '../redux/taskSlice';
import TaskDetails from './TaskDetails';
import { Star } from 'lucide-react';

const TaskList = ({ onTaskClick }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    onTaskClick(task);
  };

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-2">
        {tasks.map((task, index) => (
          <React.Fragment key={task.id}>
            <div
              className="bg-white rounded-lg p-4 flex items-center space-x-4"
              onClick={() => handleTaskClick(task)}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleComplete(task.id))}
                className="w-5 h-5 rounded-sm"
              />
              <span className={task.completed ? 'line-through text-gray-400' : ''}>
                {task.title}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleImportant(task.id));
                }}
                className={`focus:outline-none ${
                  task.important ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                <Star className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteTask(task.id));
                }}
                className="text-red-500"
              >
                🗑️
              </button>
            </div>
            {index < tasks.length - 1 && <div className="border-t border-[#9ebf9f] my-2"></div>}
          </React.Fragment>
        ))}
      </div>

      {selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default TaskList;