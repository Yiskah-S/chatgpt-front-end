// LogInPage.js

import { Button, Container, Form, FormGroup, Label, Input, NavLink } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

const LogInPage = ({ onSignInClick, onCreateAccountClick, setUser }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	// Handler for login form submission
	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			// Sending login request
			console.log('Sending login request...');
			const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login/`, {
				email: email,
				password: password,
			});

			console.log('Login response:', response.data);

			// If login successful, navigate to dashboard
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
		<div className="bg-custom-box">
			<Container className="mt-5 custom-container">
				<NavLink className="custom-link-h1 text-secondary" tag={Link} to="/">Home</NavLink>
				<div id="signin" className="visible">
					<h2 className="mt-3 text-primary">Log In</h2>
					<Form id="log-in-form" onSubmit={handleSubmit}>
						<FormGroup className="mb-3">
							<Label htmlFor="email" className="form-label">Email:</Label>
							<Input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
						</FormGroup>
						<FormGroup className="mb-3">
							<Label htmlFor="password" className="form-label">Password:</Label>
							<Input type="password" className="form-control" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
						</FormGroup>
						<Button type="submit" color="primary" size="lg">Log In</Button>
					</Form>
					<p className="text-center mt-3" style={{ display: 'flex', justifyContent: 'center' }}>
						<span>Don't have an account?</span>
						<NavLink className="custom-link text-secondary" tag={Link} color="color-2" to="/create-account" style={{ marginLeft: '5px' }}>Create Account</NavLink>
					</p>
				</div>
			</Container>
		</div>
	);
};

export default LogInPage;
