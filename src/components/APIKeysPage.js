// APIKeysPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './APIKeysPage.css';

const APIKeysPage = ({ onLogOut, user }) => {
	const [apiKeys, setApiKeys] = useState({
		chatgptKey: '',
		notionKey: '',
		googleDocsKey: '',
		capacitiesKey: '',
	});

	const navigate = useNavigate();

	const handleSubmitAPIKeys = (event) => {
		event.preventDefault();

		// Add a debug statement to print user and user.id
		console.log('User:', user);
		console.log('User ID:', user.id);

		const apiKeysArray = Object.entries(apiKeys).map(([api_type, api_key]) => ({
			api_type,
			api_key,
		}));

		axios
			.post(`${process.env.REACT_APP_BACKEND_URL}/api-keys/api-keys/${user.id}`, {
				apiKeys: apiKeysArray, 
			})
			.then((response) => {
				console.log('API keys added successfully', response.data);
			})
			.catch((error) => {
				console.error('Error adding API keys', error);
			});

		console.log('Data being sent:', { apiKeys: apiKeysArray, user_id: user.id });
	};

	const handleLogOut = () => {
		onLogOut();
		navigate('/');
	};


	return (
		<div className="container">
			<header>
				<h1>Dashboard</h1>
				<h2>Hi, {user.username}!</h2>
				<nav>
					<Link to="/dashboard">Dashboard</Link>
					<Link to="/prompt-library">Prompt Library</Link>
					<Link to="/api-keys">API Keys Page</Link>
					<Link to="/account-details">Account Details</Link>
					<button onClick={handleLogOut}>Log Out</button>
				</nav>
			</header>
			<main>
				<div className="api-key-form">
					<h1>API Key Setup</h1>
					<form onSubmit={handleSubmitAPIKeys}>
						<label htmlFor="chatgpt-key">ChatGPT API Key:</label>
						<input
							type="text"
							name="chatgptKey"
							value={apiKeys.chatgptKey}
							onChange={(e) => setApiKeys({ ...apiKeys, chatgptKey: e.target.value })}
							required
						/>
						<label htmlFor="notion-key">Notion API Key:</label>
						<input
							type="text"
							name="notionKey"
							value={apiKeys.notionKey}
							onChange={(e) => setApiKeys({ ...apiKeys, notionKey: e.target.value })}
							required
						/>
						<label htmlFor="google-docs-key">Google Docs API Key:</label>
						<input
							type="text"
							name="googleDocsKey"
							value={apiKeys.googleDocsKey}
							onChange={(e) => setApiKeys({ ...apiKeys, googleDocsKey: e.target.value })}
							required
						/>
						<label htmlFor="capacities-key">Capacities API Key:</label>
						<input
							type="text"
							name="capacitiesKey"
							value={apiKeys.capacitiesKey}
							onChange={(e) => setApiKeys({ ...apiKeys, capacitiesKey: e.target.value })}
							required
						/>
						<button type="submit">Save API Keys</button>
					</form>

				</div>
			</main>
		</div>
	);
};

export default APIKeysPage;
