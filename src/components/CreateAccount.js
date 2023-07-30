import React, { useState } from 'react';
import axios from 'axios';

const CreateAccount = ({ onSignInClick }) => {
	const [newUsername, setNewUsername] = useState('');
	const [newEmail, setNewEmail] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();

		// Check if passwords match
		if (newPassword !== confirmPassword) {
			console.error('Passwords do not match');
			return;
		}

		// Make a POST request to create a new user account
		axios
			.post(`${process.env.REACT_APP_BACKEND_URL}/users`, {
				username: newUsername,
				email: newEmail,
				password: newPassword,
			})
			.then((response) => {
				console.log('User created:', response.data);
			})
			.catch((error) => {
				console.error('Error creating user:', error);
			});
	};

	return (
		<div className="container">
			<h1>ChatGPT Crawler Site</h1>
			<div id="create-account" className="visible">
				<h2>Create Account</h2>
				<form id="create-account-form" onSubmit={handleSubmit}>
					<label htmlFor="new-username">Username:</label>
					<input
						type="text"
						id="new-username"
						name="new-username"
						value={newUsername}
						onChange={(e) => setNewUsername(e.target.value)}
						required
					/>

					<label htmlFor="new-email">Email:</label>
					<input
						type="email"
						id="new-email"
						name="new-email"
						value={newEmail}
						onChange={(e) => setNewEmail(e.target.value)}
						required
					/>

					<label htmlFor="new-password">Password:</label>
					<input
						type="password"
						id="new-password"
						name="new-password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						required
					/>

					<label htmlFor="confirm-password">Confirm Password:</label>
					<input
						type="password"
						id="confirm-password"
						name="confirm-password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>

					<button type="submit">Create Account</button>
				</form>
				<p>Already have an account? <a href="#" onClick={onSignInClick}>Sign In</a></p>
			</div>
		</div>
	);
};

export default CreateAccount;
