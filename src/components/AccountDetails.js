// AccountDetails.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AccountDetails.css';

const AccountDetails = ({ onLogOut, user }) => {

    const navigate = useNavigate();

	const handleLogOut = () => {
		onLogOut();
		navigate('/'); 
	};


	return (
		<div className="container">
			<header>
				<h1>ChatGPT Crawler Site</h1>
				<nav>
                    <Link to="/dashboard">Dashboard</Link>
					<Link to="/prompt-library">Prompt Library</Link>
					<Link to="/apikeyspage">API Keys Page</Link>
					<Link to="/account-details">Account Details</Link>
					<button onClick={handleLogOut}>Log Out</button>
				</nav>
			</header>
			<main>
				<section>
					<h2>Account Details</h2>
					<p>
						<strong>Username:</strong> {user.username}
					</p>
					<p>
						<strong>Email:</strong> {user.email}
					</p>
					<p>
						<strong>ID:</strong> {user.id}
					</p>
				</section>
			</main>
		</div>
	);
};

export default AccountDetails;
