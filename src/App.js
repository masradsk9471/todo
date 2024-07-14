import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';
import {
  fetchTasks,
  addTask,
  deleteTask,
  editTask,
  saveTask,
} from './components/store/actions'; 

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#e0f7fa',
    minHeight: '100vh',
    paddingTop: 4,
    paddingBottom: 4,
  },
  listItem: {
    backgroundColor: '#f0f0f0',
    marginBottom: 1,
    padding: 2,
    borderRadius: 16,
  },
  textField: {
    marginBottom: 1,
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 1,
  },
  saveButton: {
    marginRight: 'auto',
    marginTop: 1,
  },
  editButton: {
    marginRight: 1,
  },
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const editTaskId = useSelector(state => state.tasks.editTaskId);

  const [newTask, setNewTask] = useState('');
  const [editedTaskTitle, setEditedTaskTitle] = useState('');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = () => {
    if (newTask.trim() === '') return;

    const newTaskObject = {
      id: tasks.length + 1,
      todo: newTask,
      completed: false,
      userId: 1, 
    };

    dispatch(addTask(newTaskObject));
    setNewTask('');
  };

  const handleDeleteTask = id => {
    dispatch(deleteTask(id));
  };

  const handleEditTask = task => {
    dispatch(editTask(task.id));
    setEditedTaskTitle(task.todo);
  };

  const handleEditChange = (event) => {
    setEditedTaskTitle(event.target.value); 
  };

  const handleSaveTask = () => {
    if (editedTaskTitle.trim() === '') return;

    dispatch(saveTask({ id: editTaskId, todo: editedTaskTitle }));
    dispatch(editTask(null)); 
    setEditedTaskTitle(''); 
  };

  return (
    <Box className={classes.root}>
      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          To-Do List
        </Typography>
        <Box display="flex" mb={2}>
          <TextField
            label="New Task"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddTask}
            style={{ marginLeft: '1rem' }}
          >
            Add
          </Button>
        </Box>
        <List>
          {tasks.length > 0 &&
            tasks.map(task => (
              <ListItem key={task.id} className={classes.listItem} sx={{ mt: 1 }}>
                {editTaskId === task.id ? (
                  <>
                    <TextField
                      value={editedTaskTitle}
                      onChange={handleEditChange}
                      variant="outlined"
                      fullWidth
                      className={classes.textField}
                    />
                    <div className={classes.buttonsContainer}>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<SaveIcon />}
                        onClick={handleSaveTask}
                        className={classes.saveButton}
                      >
                        Save
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <ListItemText primary={task.todo} />
                    <div className={classes.buttonsContainer}>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        className={classes.editButton}
                        onClick={() => handleEditTask(task)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </>
                )}
              </ListItem>
            ))}
        </List>
      </Container>
    </Box>
  );
};

export default App;
