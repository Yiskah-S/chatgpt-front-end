// AccountDetails.js

import { Button, Container, Form, FormGroup, Label, Input, Select, Dropdown, Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import React from 'react';

const AccountDetails = ({ onLogOut, user }) => {
	const { username, email, id } = user; // Destructuring user properties
	const navigate = useNavigate();

	const handleLogOut = () => {
		onLogOut();
		navigate('/');
	};

	return (
		<Container>
			<header className="bg-custom-header">
				<Container className="mt-5 custom-container">
					<div className="w-100 text-center p-3">
						<h1 className="color-1">Account Details</h1>
					</div>
				<Navigation handleLogOut={handleLogOut} user={user} />
				</Container>
			</header>
			
			<div className="bg-custom-box">
				<Container className="mt-5 custom-container">
					<main>
					<section>
						<p><strong className="strong-text">ID:</strong> {id}</p>
						<p><strong className="strong-text">Username:</strong> {username}</p>
						<p><strong className="strong-text">Email:</strong> {email}</p>
					</section>
					</main>
			</Container>
			</div>
		</Container>
	);
};

export default AccountDetails;
