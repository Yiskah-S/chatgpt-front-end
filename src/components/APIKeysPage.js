// APIKeysPage.js

import { Button, Container, Form, FormGroup, Label, Input, Select, Dropdown, Alert } from 'reactstrap';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import axios from 'axios';

const APIKeysPage = ({ onLogOut, user }) => {
	const [apiKeys, setApiKeys] = useState({
		chatgptKey: '',
		notionKey: '',
		googleDocsKey: '',
		capacitiesKey: '',
	});
	const navigate = useNavigate();

	// Fetch API keys
	const fetchAPIKeys = useCallback(async () => {
		try {
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
	}, [user.id]);
	// Added fetchAPIKeys to dependency array
	useEffect(() => {
		fetchAPIKeys();
	}, [fetchAPIKeys]);

	// Handler for input change
	const handleInputChange = (name, value) => {
		setApiKeys((prevState) => ({
			...prevState,
			[name]: value
		}));
	};

	// Handler for API key form submission
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
		} catch (error) {
			console.error('Error updating API keys', error);
		}
	};

	// Handler for logout
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
		<Container>
		<header className="bg-custom-header">
			<Container className="mt-5 custom-container">
				<div className="w-100 text-center p-3">
					<h1 className="color-1">API Keys</h1>
				</div>
			<Navigation handleLogOut={handleLogOut} user={user} />
			</Container>
		</header>

		<div className="bg-custom-box">
			<Container className="mt-5 custom-container">
				<main>
					<div className="api-key-form">
						<Form onSubmit={handleSubmitAPIKeys}>
							{formFields.map((field) => (
								<FormGroup className="mb-3" key={field.name}>
									<Label htmlFor={field.name} className="form-label">{field.label}</Label>
									<Input
										type="text"
										name={field.name}
										value={apiKeys[field.name]}
										onChange={(e) => handleInputChange(field.name, e.target.value)}
									/>
								</FormGroup>
							))}
							<Button type="submit" color="primary">Save API Keys</Button>
						</Form>
					</div>
				</main>
			</Container>
		</div>
		</Container>
	);
};

export default APIKeysPage;
