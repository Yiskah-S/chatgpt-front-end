// AccountDetails.js

import React from 'react';
import './AccountDetails.css';

const AccountDetails = ({ user }) => {
	return (
		<div className="container">
			<header>
				<h1>ChatGPT Crawler Site</h1>
				<nav>
					<a href="/">Home</a>
					<a href="/prompt-library">Prompt Library</a>
					<a href="#">API Keys Page</a>
					<a href="/logout">Log Out</a>
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
