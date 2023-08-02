// LogInPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogInPage = ({ onCreateAccountClick }) => {  // Include onCreateAccountClick in props
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();

		// Make a POST request to log in the user
		axios
			.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
				email: email,
				password: password,
			})
			.then((response) => {
				console.log('User logged in:', response.data);
			})
			.catch((error) => {
				console.error('Error logging in user:', error);
			});
	};

	const handleCreateAccountClick = () => {
		navigate('/create-account');  // Navigate to the create account page when the link is clicked
		onCreateAccountClick();  // Call the onCreateAccountClick prop
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
