// PromptLibrart.js

import React, { useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './PromptLibrary.css';

const PromptLibraryPage = ({ onLogOut, user }) => {
	const [title, setTitle] = useState('');
	const [category, setCategory] = useState('');
	const [prompt, setPrompt] = useState('');
	const navigate = useNavigate();

	const handleSubmitPrompt = (event) => {
		event.preventDefault();

		// Add a debug statement to print user and user.id
		console.log('User:', user);
		console.log('User ID:', user.id);

		// Make a POST request to create a new user account
		axios
			.post(`${process.env.REACT_APP_BACKEND_URL}/prompt-library/prompts/`, {
				title: title,
				category: category,
				prompt: prompt,
				user_id: user.id,
			})
			.then((response) => {
				console.log('Prompt created:', response.data);
			})
			.catch((error) => {
				console.error('Error creating prompt:', error);
			});

			console.log('Data being sent:', {
				title: title,
				category: category,
				prompt: prompt,
				user_id: user.id,
			});
	};


	const handleLogOut = () => {
		onLogOut();
		navigate('/');
	};

	return (
		<div className="container">
			<header>
				<h1>Prompt Input</h1>
				<nav>
					<Link to="/dashboard">Dashboard</Link>
					<Link to="/prompt-library">Prompt Library</Link>
					<Link to="/api-keys">API Keys Page</Link>
					<Link to="/account-details">Account Details</Link>
					<button onClick={handleLogOut}>Log Out</button>
				</nav>
			</header>
			<form id="prompt-form" onSubmit={handleSubmitPrompt}>
				<label htmlFor="title">Title:</label>
				<input
					type="text"
					id="title"
					name="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<label htmlFor="category">Category:</label>
				<input
					type="text"
					id="category"
					name="category"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					required
				/>
				<label htmlFor="prompt">Prompt:</label>
				<textarea
					id="prompt"
					name="prompt"
					rows="5"
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					required
				></textarea>
				<button type="submit">Save Prompt</button>
			</form>
		</div>
	);
};

export default PromptLibraryPage;
