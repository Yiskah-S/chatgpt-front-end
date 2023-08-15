// APIKeysPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
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
			// Extracted logic for setting keys
			if (response.data && response.data.length > 0) {
				setApiKeys((prevState) => ({
					...prevState,
					...response.data.reduce((acc, item) => {
						acc[item.api_type] = item.api_key;
						return acc;
					}, {})
				}));
			}
		} catch (error) {
			console.error('Error fetching API keys:', error);
		}
	};
	useEffect(() => {
		fetchAPIKeys();
	}, []);

	const handleInputChange = (name, value) => {
		setApiKeys((prevState) => ({
			...prevState,
			[name]: value
		}));
	};

	const handleSubmitAPIKeys = async (event) => {
		event.preventDefault();
		const url = `${process.env.REACT_APP_BACKEND_URL}/api-keys/${user.id}/`;

		const keysArray = Object.keys(apiKeys).map((key) => ({
			api_type: key,
			api_key: apiKeys[key],
		}));

		try {
			if (keysArray.some((key) => key.api_key !== '')) {
				await axios.put(url, { apiKeys: keysArray });
			} else {
				await axios.post(url, { apiKeys: keysArray });
			}
			console.log('API keys updated successfully');
		} catch (error) {
			console.error('Error updating API keys', error);
		}
	};

	const handleLogOut = () => {
		onLogOut();
		navigate('/');
	};

	const formFields = [
		{ name: 'chatgptKey', label: 'ChatGPT API Key:' },
		{ name: 'notionKey', label: 'Notion API Key:' },
		{ name: 'notionDbId', label: 'Notion Database ID:' },
		{ name: 'capacitiesKey', label: 'Capacities API Key:' },
	];

	return (
		<div className="container">
			<header>
				<h1>Dashboard</h1>
				<h2>Hi, {user.username}!</h2>
				<Navigation handleLogOut={handleLogOut} />
			</header>
			<main>
				<div className="api-key-form">
					<h1>API Key Setup</h1>
					<form onSubmit={handleSubmitAPIKeys}>
						{formFields.map((field) => (
							<div key={field.name}>
								<label htmlFor={field.name}>{field.label}</label>
								<input
									type="text"
									name={field.name}
									value={apiKeys[field.name]}
									onChange={(e) => handleInputChange(field.name, e.target.value)}
								/>
							</div>
						))}
						<button type="submit">Save API Keys</button>
					</form>
				</div>
			</main>
		</div>
	);
};

export default APIKeysPage;
