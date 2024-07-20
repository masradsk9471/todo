import axios from 'axios';
import { SET_TASKS, ADD_TASK, DELETE_TASK, EDIT_TASK, SAVE_TASK, UPDATE_EDIT_TASK_TITLE } from './actionTypes';

export const fetchTasks = () => async dispatch => {
  try {
    const response = await axios.get('https://dummyjson.com/todos');
    console.log("response?.data?.todos",response?.data?.todos)
    dispatch(setTasks(response?.data?.todos));
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

export const setTasks = tasks => ({
  type: SET_TASKS,
  payload: tasks,
});

export const addTask = newTask => ({
  type: ADD_TASK,
  payload: newTask,
});

export const deleteTask = taskId => ({
  type: DELETE_TASK,
  payload: taskId,
});

export const editTask = taskId => ({
  type: EDIT_TASK,
  payload: taskId,
});

export const saveTask = updatedTask => ({
  type: SAVE_TASK,
  payload: updatedTask,
});

export const updateEditTaskTitle = title => ({
  type: UPDATE_EDIT_TASK_TITLE,
  payload: title,
});
