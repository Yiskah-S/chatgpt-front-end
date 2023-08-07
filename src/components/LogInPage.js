// LogInPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LogInPage = ({ onSignInClick, onCreateAccountClick, setUser, user }) => {  
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
	
		try {
		  // Adds debug statement to check the endpoint being called
			console.log('Sending login request...');
		
			const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
				email: email,
				password: password,
			});
		
			console.log('Login response:', response.data);
		
			if (response.status === 200) {
				setUser(response.data); 
				onSignInClick(email, password);
				navigate('/dashboard'); 
			} else {
				console.log('Login failed');
			}
			} catch (error) {
			console.error('Error logging in user:', error);
			}
		};

	return (
		<div className="container">
			<h1>ChatGPT Crawler Site</h1>
			<Link to="/">Home</Link>
			<div id="log-in" className="visible">
				<h2>Log In</h2>
				<form id="log-in-form" onSubmit={handleSubmit}>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<button type="submit">Log In</button>
				</form>
				<p>
				Don't have an account? 
					<Link to="/create-account">Create Account</Link>
				</p>
			</div>
		</div>
	);
};

export default LogInPage;
