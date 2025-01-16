import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_KEY = 'aad9181f7940403a83a11459251601'; // Replace with your actual API key

export const fetchWeather = createAsyncThunk('tasks/fetchWeather', async (location, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return rejectWithValue(error.response.data);
  }
});

const loadTasksFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('tasks');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.warn('Could not load tasks from local storage', e);
    return [];
  }
};

const saveTasksToLocalStorage = (tasks) => {
  try {
    const serializedState = JSON.stringify(tasks);
    localStorage.setItem('tasks', serializedState);
  } catch (e) {
    console.warn('Could not save tasks to local storage', e);
  }
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: loadTasksFromLocalStorage(),
    weather: null,
    status: 'idle',
    error: null,
    activeFilter: 'all', // Add activeFilter to the initial state
    searchQuery: '', // Add searchQuery to the initial state
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = { ...action.payload, id: uuidv4(), createdDate: new Date().toISOString() };
      state.tasks.push(newTask);
      saveTasksToLocalStorage(state.tasks);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    toggleImportant: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.important = !task.important;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    setFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setReminder: (state, action) => {
      const { taskId, reminderTime } = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.reminderTime = reminderTime;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    setDueDate: (state, action) => {
      const { taskId, dueDate } = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.dueDate = dueDate;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    assignToSelf: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.assignedTo = task.assignedTo === 'myself' ? null : 'myself';
        saveTasksToLocalStorage(state.tasks);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addTask, deleteTask, toggleComplete, toggleImportant, setFilter, setSearchQuery, setReminder, setDueDate, assignToSelf } = taskSlice.actions;
export default taskSlice.reducer;