import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PromptLibrary.css';

const PromptLibraryPage = () => {
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [category, setCategory] = useState('');
	const [promptText, setPromptText] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		// Send the prompt data to the backend server
		fetch('/savePrompt', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title, category, prompt: promptText }),
		})
		.then((response) => response.json())
		.then((data) => {
			console.log('Prompt saved successfully:', data);
		})
		.catch((error) => {
			console.error('Error saving prompt:', error);
			// Handle errors
		});
	};

	return (
		<div className="container">
			<h1>Prompt Input</h1>
            <button onClick={() => navigate('/')}>Back to Dashboard</button>
			<form id="prompt-form" onSubmit={handleSubmit}>
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
					value={promptText}
					onChange={(e) => setPromptText(e.target.value)}
					required
				></textarea>
				<button type="submit">Save Prompt</button>
			</form>
		</div>
	);
};

export default PromptLibraryPage;
