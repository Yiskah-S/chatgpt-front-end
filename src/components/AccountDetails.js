// AccountDetails.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountDetails.css';
import Navigation from './Navigation';

const AccountDetails = ({ onLogOut, user }) => {
	const { username, email, id } = user; // Destructuring user properties
	const navigate = useNavigate();

	const handleLogOut = () => {
		onLogOut();
		navigate('/');
	};

	return (
		<div className="container">
			<header>
				<h1>ChatGPT Crawler Site</h1>
				<Navigation handleLogOut={handleLogOut} />
			</header>
			<main>
				<section>
					<h2>Account Details</h2>
					<p>
						<strong>Username:</strong> {username}
					</p>
					<p>
						<strong>Email:</strong> {email}
					</p>
					<p>
						<strong>ID:</strong> {id}
					</p>
				</section>
			</main>
		</div>
	);
};

export default AccountDetails;
