import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import "./master.css"

const Master = ({ user }) => {
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksRef = db.collection('tasks');
      const query = tasksRef.orderBy('createdAt', 'desc');
      const unsubscribe = query.onSnapshot((snapshot) => {
        const tasksData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTasks(tasksData);
      });
      return unsubscribe;
    };

    fetchTasks();
  }, []);

  const handleTaskInput = (event) => {
    setTaskInput(event.target.value);
  };

  const handleAddTask = async () => {
    try {
      await db.collection('tasks').add({
        masterId: user.uid,
        task: taskInput,
        status: 'pending',
        createdAt: new Date(),
      });
      setTaskInput('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='master-main-container'>
      <h1>Welcome Master {user?.displayName}</h1>
      <h2>Create New Task:</h2>
      <input type="text" value={taskInput} onChange={handleTaskInput} />
      <button onClick={handleAddTask}>Add Task</button>
      <h2>All Tasks:</h2>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.task} ({task.status})
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks found</p>
      )}
    </div>
  );
};

export default Master;
