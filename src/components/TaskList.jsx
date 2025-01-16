import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleComplete, toggleImportant } from '../redux/taskSlice';
import TaskDetails from './TaskDetails';
import { Star, Calendar as CalendarIcon } from 'lucide-react';

const TaskList = ({ onTaskClick, selectedTask, isCardView, darkMode }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const activeFilter = useSelector(state => state.tasks.activeFilter);

  const handleTaskClick = (task) => {
    onTaskClick(task);
  };

  const handleCheckboxClick = (e, taskId) => {
    e.stopPropagation();
    dispatch(toggleComplete(taskId));
  };

  const handleToggleImportant = (e, taskId) => {
    e.stopPropagation();
    dispatch(toggleImportant(taskId));
  };

  const today = new Date().toDateString();

  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'today') return new Date(task.createdDate).toDateString() === today || new Date(task.dueDate).toDateString() === today;
    if (activeFilter === 'important') return task.important;
    if (activeFilter === 'assigned') return task.assignedTo;
    return true;
  });

  // Separate completed and incomplete tasks
  const incompleteTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  return (
    <div className={`flex-1 p-6 ${selectedTask ? 'mr-80' : ''} transition-all duration-300 ${darkMode ? 'bg-[#222223] text-white' : 'bg-white text-black'}`}>
      <div className={`max-w-full mx-auto ${isCardView ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-2'}`}>
        {[...incompleteTasks].map((task, index) => (
          <React.Fragment key={task.id}>
            <div className={`rounded-lg p-4 flex items-center space-x-4 w-full ${isCardView ? 'border h-32' : ''} ${darkMode ? 'bg-[#2d2c2d] border-gray-700' : 'bg-white border-gray-200'}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => handleCheckboxClick(e, task.id)}
                className={`w-5 h-5 rounded-sm ${task.completed ? 'bg-[#347837]' : ''} border-2 ${darkMode ? 'border-gray-400' : 'border-gray-400'} ${darkMode && task.completed ? 'checked:bg-[#347837]' : ''}`}
              />
              <span
                className={`flex-1 cursor-pointer ${task.completed ? 'line-through text-gray-400' : ''}`}
                onClick={() => handleTaskClick(task)}
              >
                {task.title}
              </span>
              {task.dueDate && (
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              )}
              <button
                onClick={(e) => handleToggleImportant(e, task.id)}
                className={`focus:outline-none ${task.important ? (darkMode ? 'text-white' : 'text-black') : 'text-gray-300'}`}
              >
                <Star className={`w-5 h-5 ${task.important ? 'fill-current' : ''} ${task.important ? (darkMode ? 'text-white' : 'text-black') : ''}`} />
              </button>
            </div>
            {!isCardView && index < incompleteTasks.length - 1 && <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-[#9ebf9f]'} my-2`}></div>}
          </React.Fragment>
        ))}
      </div>

      {completedTasks.length > 0 && (
        <div className="mt-8">
          <h2 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>Completed Tasks</h2>
          <div className="max-w-full mx-auto space-y-2 mt-4">
            {[...completedTasks].map((task, index) => (
              <React.Fragment key={task.id}>
                <div className={`rounded-lg p-4 flex items-center space-x-4 w-full border ${darkMode ? 'border-gray-700' : 'bg-white border-gray-200'}`}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={(e) => handleCheckboxClick(e, task.id)}
                    className={`w-5 h-5 rounded-sm ${task.completed ? 'bg-[#347837]' : ''} border-2 ${darkMode ? 'border-gray-400' : 'border-gray-400'} ${darkMode && task.completed ? 'checked:bg-[#347837]' : ''}`}
                  />
                  <span
                    className={`flex-1 cursor-pointer ${task.completed ? 'line-through text-gray-400' : ''}`}
                    onClick={() => handleTaskClick(task)}
                  >
                    {task.title}
                  </span>
                  {task.dueDate && (
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="w-5 h-5" />
                      <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  <button
                    onClick={(e) => handleToggleImportant(e, task.id)}
                    className={`focus:outline-none ${task.important ? (darkMode ? 'text-white' : 'text-black') : 'text-gray-300'}`}
                  >
                    <Star className={`w-5 h-5 ${task.important ? 'fill-current' : ''} ${task.important ? (darkMode ? 'text-white' : 'text-black') : ''}`} />
                  </button>
                </div>
                {index < completedTasks.length - 1 && <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-[#9ebf9f]'} my-2`}></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {selectedTask && (
        <TaskDetails
          task={tasks.find(task => task.id === selectedTask.id)}
          onClose={() => onTaskClick(null)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default TaskList;