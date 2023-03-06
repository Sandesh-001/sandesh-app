import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import "./student.css"

const Student = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksRef = db.collection('tasks');
      const query = tasksRef.where('status', '==', 'pending').orderBy('createdAt', 'desc');
      const unsubscribe = query.onSnapshot((snapshot) => {
        const tasksData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTasks(tasksData);
      });
      return unsubscribe;
    };

    fetchTasks();
  }, []);

  const handleCompleteTask = async (taskId) => {
    try {
      await db.collection('tasks').doc(taskId).update({
        status: 'completed',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='student-main-container'>
      <h1>Welcome Student</h1>
      <h2>Available Tasks:</h2>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.task} - added by {task.masterName}
              <button onClick={() => handleCompleteTask(task.id)}>Complete Task</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks found</p>
      )}
    </div>
  );
};

export default Student;
