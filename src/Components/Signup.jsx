import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import "./signup.css"

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);

            await userCredential.user.updateProfile({
                displayName: username,
            });

            await db.collection('users').doc(userCredential.user.uid).set({
                uid: userCredential.user.uid,
                username,
                email,
                password,
                role,
            });

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
        <div className='signup-main-container'>
            <h1>Signup Page</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter username" />
                </label>
                <br />
                <label>
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email"/>
                </label>
                <br />
                <label>
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password"/>
                </label>
                <br />
                <label>
                    <select value={role} onChange={(event) => setRole(event.target.value)}>
                        <option value="student">Student</option>
                        <option value="master">Master</option>
                    </select>
                </label>
                <br />
                <button type="submit">Sign up</button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default Signup;
