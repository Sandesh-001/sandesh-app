import React from 'react';
import { Link } from 'react-router-dom';
import "./home.css"

function Home() {
    return (
        <div className='main-container'>
            <h1>Welcome to the You Tell, I Do application</h1>
            <p>Please select an option below:</p>
            <div className='buttons'>
                <Link to="/login"><button>Login</button></Link>
                <Link to="/signup"><button>Signup</button></Link>
            </div>
        </div>
    );
}

export default Home;
