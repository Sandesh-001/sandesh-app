import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import "./login.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const userDoc = await db.collection('users').doc(userCredential.user.uid).get();
      const role = userDoc.get('role');

      if (role === 'master') {
        navigate('/master');
      } else {
        navigate('/student');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className='login-main-container'>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter email"/>
        </label>
        <br />
        <label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password"/>
        </label>
        <br />
        <button type="submit">Log in</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
