import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWeather = createAsyncThunk('tasks/fetchWeather', async (location) => {
  const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${location}`);
  return response.data;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    weather: null,
    status: 'idle',
    error: null,
    activeFilter: 'all', // Add activeFilter to the initial state
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    toggleImportant: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.important = !task.important;
      }
    },
    setFilter: (state, action) => {
      state.activeFilter = action.payload;
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
        state.error = action.error.message;
      });
  },
});

export const { addTask, deleteTask, toggleComplete, toggleImportant, setFilter } = taskSlice.actions;
export default taskSlice.reducer;