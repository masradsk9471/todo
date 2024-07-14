import { SET_TASKS, ADD_TASK, DELETE_TASK, EDIT_TASK, SAVE_TASK, UPDATE_EDIT_TASK_TITLE } from './actionTypes';

const initialState = {
  tasks: [],
  editTaskId: null,
  editTaskTitle: '',
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case EDIT_TASK:
      return {
        ...state,
        editTaskId: action.payload,
      };
    case SAVE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => (task.id === action.payload.id ? { ...task, todo: action.payload.todo } : task)),
        editTaskId: null,
      };
    case UPDATE_EDIT_TASK_TITLE:
      return {
        ...state,
        editTaskTitle: action.payload,
      };
    default:
      return state;
  }
};

export default tasksReducer;
