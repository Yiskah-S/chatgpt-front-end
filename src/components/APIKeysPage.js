// APIKeysPage.js

import React, { useState, useEffect } from 'react';
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

	const fetchAPIKeys = async () => {
		try {
			console.log('Fetching API keys...');
			const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api-keys/${user.id}/`);
	
			if (response.data && response.data.length > 0) {
				const keys = {
					chatgptKey: '',
					notionKey: '',
					googleDocsKey: '',
					capacitiesKey: '',
					...response.data.reduce((acc, item) => {
						acc[item.api_type] = item.api_key;
						return acc;
					}, {})
				};
				setApiKeys(keys);
				console.log('API Keys:', keys);
			}
		} catch (error) {
			console.error('Error fetching API keys:', error);
		}
	};
	
	useEffect(() => {
		fetchAPIKeys();
	}, []);

	const handleSubmitAPIKeys = async (event) => {
		event.preventDefault();
		const url = `${process.env.REACT_APP_BACKEND_URL}/api-keys/${user.id}/`;

		const keysArray = Object.keys(apiKeys).map((key) => ({
			api_type: key,
			api_key: apiKeys[key],
		}));

		if (keysArray.some((key) => key.api_key !== '')) {
			await axios.patch(url, { apiKeys: keysArray })
				.then((response) => {
					console.log('API keys updated successfully', response.data);
				})
				.catch((error) => {
					console.error('Error updating API keys', error);
				});
		} else {
			await axios.post(url, { apiKeys: keysArray })
				.then((response) => {
					console.log('API keys added successfully', response.data);
				})
				.catch((error) => {
					console.error('Error adding API keys', error);
				});
		}

		console.log('Data being sent:', keysArray);
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
						/>
						<label htmlFor="notion-key">Notion API Key:</label>
						<input
							type="text"
							name="notionKey"
							value={apiKeys.notionKey}
							onChange={(e) => setApiKeys({ ...apiKeys, notionKey: e.target.value })}
						/>
						<label htmlFor="google-docs-key">Google Docs API Key:</label>
						<input
							type="text"
							name="googleDocsKey"
							value={apiKeys.googleDocsKey}
							onChange={(e) => setApiKeys({ ...apiKeys, googleDocsKey: e.target.value })}
						/>
						<label htmlFor="capacities-key">Capacities API Key:</label>
						<input
							type="text"
							name="capacitiesKey"
							value={apiKeys.capacitiesKey}
							onChange={(e) => setApiKeys({ ...apiKeys, capacitiesKey: e.target.value })}
						/>
						<button type="submit">Save API Keys</button>
					</form>
				</div>
			</main>
		</div>
	);
};

export default APIKeysPage;