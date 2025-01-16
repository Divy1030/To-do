import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../redux/taskSlice';
import { LayoutList, Calendar, Star, UserCheck, PlusCircle, X } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import profileImage from '../assets/messi-pictures-jzykf84saw6wbkd6.png.png';

const Sidebar = ({ onTaskClick, darkMode, toggleSidebar }) => {
  const dispatch = useDispatch();
  const activeFilter = useSelector(state => state.tasks.activeFilter);
  const tasks = useSelector(state => state.tasks.tasks);

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  const today = new Date().toDateString();

  const menuItems = [
    { id: 'all', icon: <LayoutList className="w-5 h-5" />, title: 'All Tasks', tasks },
    { id: 'today', icon: <Calendar className="w-5 h-5" />, title: 'Today', tasks: tasks.filter(task => new Date(task.createdDate).toDateString() === today || new Date(task.dueDate).toDateString() === today) },
    { id: 'important', icon: <Star className="w-5 h-5" />, title: 'Important', tasks: tasks.filter(task => task.important) },
    { id: 'assigned', icon: <UserCheck className="w-5 h-5" />, title: 'Assigned to me', tasks: tasks.filter(task => task.assignedTo) },
  ];

  const COLORS = ['#3f9142', '#a0eda3'];

  return (
    <div className={`flex flex-col h-full ${darkMode ? 'bg-[#2d2c2d]' : 'bg-[#eef6ef]'} lg:w-64 shadow-lg sm:w-56`}>
      <div className={`p-3 flex flex-col items-center ${darkMode ? 'bg-[#222223]' : 'bg-white'}`}>
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <span className={`font-medium mt-2 ${darkMode ? 'text-white' : 'text-black'}`}>Hey, ABCD</span>
        <button onClick={toggleSidebar} className="absolute top-4 right-4">
          {/* <X className="w-6 h-6" /> */}
        </button>
      </div>

      <nav className={`flex-1 overflow-y-auto p-2 space-y-2 ${darkMode ? 'bg-[#2d2c2d]' : 'bg-[#eef6ef]'} lg:w-64 sm:w-full`}>
        <div className={`rounded-lg shadow p-2 ${darkMode ? 'bg-[#222223]' : 'bg-white'}`}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => dispatch(setFilter(item.id))}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full transition-colors ${
                activeFilter === item.id
                  ? `${darkMode ? 'bg-[#273127] text-[#72a275]' : 'bg-[#dae8dc] text-[#72a275]'}`
                  : `${darkMode ? 'text-white hover:bg-[#222223]' : 'text-gray-600 hover:bg-gray-100'}`
              }`}
            >
              <item.icon.type className={`w-5 h-5 ${activeFilter === item.id ? 'text-[#72a275]' : `${darkMode ? 'text-white' : 'text-gray-600'}`}`} />
              <span>{item.title}</span>
            </button>
          ))}
        </div>

        <div className={`rounded-lg shadow p-2 ${darkMode ? 'bg-[#222223]' : 'bg-white'}`}>
          <button className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-white hover:bg-[#222223]' : 'text-gray-600 hover:bg-gray-100'} rounded-lg w-full`}>
            <PlusCircle className="w-5 h-5" />
            <span>Add list</span>
          </button>
        </div>
      </nav>

      <div className={`p-4 rounded-lg shadow mt-2 ml-2 mr-2 mb-4 h-72 ${darkMode ? 'bg-[#222223]' : 'bg-white'}`}>
        <div className="mb-2 flex justify-between items-center">
          <span className="font-medium">Today Tasks</span>
          <span className="text-xl font-semibold">{totalTasks}</span>
        </div>
        
        <div className="relative w-full pt-4">
          <div className="w-40 h-40 mx-auto">
            <PieChart width={160} height={160}>
              <Pie
                data={[
                  { name: 'Completed', value: completedTasks },
                  { name: 'Remaining', value: totalTasks - completedTasks },
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                fill="#3f9142"
                label
              >
                {[
                  { name: 'Completed', value: completedTasks },
                  { name: 'Remaining', value: totalTasks - completedTasks },
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
          <div className="bottom-0 left-0 flex space-x-4 text-sm p-2 mt-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#3f9142] mr-1"></div>
              <span>Done</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#a0eda3] mr-1"></div>
              <span>Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;