import React, { useState } from 'react';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import { ChevronDown, ChevronRight } from 'lucide-react';

const TodoPage = () => {
  const [inputVisible, setInputVisible] = useState(false);

  const toggleInputVisibility = () => {
    setInputVisible(!inputVisible);
  };

  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-medium text-gray-700">Todo</span>
          <button onClick={toggleInputVisibility} className="text-gray-700">
            {inputVisible ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {inputVisible && (
        <>
          <div className="border-t border-[#9ebf9f] my-4"></div>
          <TaskInput />
        </>
      )}
      <div className="border-t border-[#9ebf9f] my-4"></div>
      <TaskList />
    </div>
  );
};

export default TodoPage;