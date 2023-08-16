// CreateAccount.js

import { Button, Container, Form, FormGroup, Label, Input, NavLink } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

const CreateAccount = ({ onCreateAccountClick }) => {
	const [newUsername, setNewUsername] = useState('');
	const [newEmail, setNewEmail] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const navigate = useNavigate();

	// Handler for account creation form submission
	const handleSubmit = (event) => {
		event.preventDefault();

		// Check if passwords match
		if (newPassword !== confirmPassword) {
			console.error('Passwords do not match');
			return;
		}

		// Make a POST request to create a new user account
		axios
			.post(`${process.env.REACT_APP_BACKEND_URL}/users/`, {
				username: newUsername,
				email: newEmail,
				password: newPassword,
			})
			.then((response) => {
				console.log('User created:', response.data);
				navigate('/signin')
			})
			.catch((error) => {
				console.error('Error creating user:', error);
			});
	};

	return (
		<div className="bg-custom-box">
			<Container className="mt-5 custom-container">
				<NavLink className="custom-link-h1" tag={Link} to="/">Home</NavLink>
				<div id="create-account" className="visible">
					<h2 className="mt-3">Create Account</h2>
					<Form id="create-account-form" onSubmit={handleSubmit}>
						<FormGroup className="mb-3">
							<Label htmlFor="new-username" className="form-label">Username:</Label>
							<Input type="text" className="form-control" id="new-username" name="new-username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} required />
						</FormGroup>
						<FormGroup className="mb-3">
							<Label htmlFor="new-email" className="form-label">Email:</Label>
							<Input type="email" className="form-control" id="new-email" name="new-email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required />
						</FormGroup>
						<FormGroup className="mb-3">
							<Label htmlFor="new-password" className="form-label">Password:</Label>
							<Input type="password" className="form-control" id="new-password" name="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
						</FormGroup>
						<FormGroup className="mb-3">
							<Label htmlFor="confirm-password" className="form-label">Confirm Password:</Label>
							<Input type="password" className="form-control" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
						</FormGroup>
						<Button type="submit" color="primary">Create Account</Button>
					</Form>
					<p className="text-center mt-3" style={{ display: 'flex', justifyContent: 'center' }}>
						<span>Already have an account?</span>
						<NavLink className="custom-link" tag={Link} to="/signin" style={{ marginLeft: '5px' }}>Sign In</NavLink>
					</p>
				</div>
			</Container>
		</div>
	);
};

export default CreateAccount;
