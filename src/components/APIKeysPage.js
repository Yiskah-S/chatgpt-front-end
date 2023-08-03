// APIKeysPage.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './APIKeysPage.css';

const APIKeysPage = ({ onLogOut, user }) => {
	const navigate = useNavigate();
	const [chatgptKey, setChatgptKey] = useState('');
	const [notionKey, setNotionKey] = useState('');
	const [googleDocsKey, setGoogleDocsKey] = useState('');
	const [capacitiesKey, setCapacitiesKey] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		// Save the API keys to local storage (you can use a more secure storage method in production)
		localStorage.setItem('chatgptApiKey', chatgptKey);
		localStorage.setItem('notionApiKey', notionKey);
		localStorage.setItem('googleDocsApiKey', googleDocsKey);
		localStorage.setItem('capacitiesApiKey', capacitiesKey);
		// You can perform additional actions like displaying a success message, etc.
		console.log('API keys saved successfully!');
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
					<Link to="/apikeyspage">API Keys Page</Link>
					<Link to="/account-details">Account Details</Link>
					<button onClick={handleLogOut}>Log Out</button>
				</nav>
			</header>
			<main>
				<div className="api-key-form">
					<h1>API Key Setup</h1>
					<form onSubmit={handleSubmit}>
						<label htmlFor="chatgpt-key">ChatGPT API Key:</label>
						<input
							type="text"
							id="chatgpt-key"
							name="chatgpt-key"
							value={chatgptKey}
							onChange={(e) => setChatgptKey(e.target.value)}
							required
						/>

						<label htmlFor="notion-key">Notion API Key:</label>
						<input
							type="text"
							id="notion-key"
							name="notion-key"
							value={notionKey}
							onChange={(e) => setNotionKey(e.target.value)}
							required
						/>

						<label htmlFor="google-docs-key">Google Docs API Key:</label>
						<input
							type="text"
							id="google-docs-key"
							name="google-docs-key"
							value={googleDocsKey}
							onChange={(e) => setGoogleDocsKey(e.target.value)}
							required
						/>

						<label htmlFor="capacities-key">Capacities API Key:</label>
						<input
							type="text"
							id="capacities-key"
							name="capacities-key"
							value={capacitiesKey}
							onChange={(e) => setCapacitiesKey(e.target.value)}
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
