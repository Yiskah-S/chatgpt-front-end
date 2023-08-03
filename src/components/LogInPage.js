// LogInPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogInPage = ({ onCreateAccountClick, onSignInClick, setUser }) => {  
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();


	const handleSubmit = async (event) => { 
		event.preventDefault();
	
		try {
			// Adds debug statement to check the endpoint being called
			console.log("Sending login request...");
	
			const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
				email: email,
				password: password,
			});
	
			console.log("Login response:", response.data);

			if (response.ok) {
				// Redirect to Dashboard after successful login
				navigate('/dashboard');
			}
		} catch (error) {
			console.error("Error logging in user:", error);
		}
	};
	
	const handleCreateAccountClick = () => {
		navigate('/create-account');  
		onCreateAccountClick();  
	};

	return (
		<div className="container">
			<h1>ChatGPT Crawler Site</h1>
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
					Don't have an account?{' '}
					<a href="#" onClick={handleCreateAccountClick}>
						Create Account
					</a>
				</p>
			</div>
		</div>
	);
};

export default LogInPage;
