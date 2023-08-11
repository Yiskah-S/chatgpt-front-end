// PromptLibrart.js

import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './PromptLibrary.css';

const PromptLibraryPage = ({ onLogOut, user }) => {
	const [title, setTitle] = useState('');
	const [category, setCategory] = useState('');
	const [prompt, setPrompt] = useState('');
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [promptsInCategory, setPromptsInCategory] = useState([]);
	const [selectedPrompt, setSelectedPrompt] = useState(null);
	const navigate = useNavigate();

	const fetchCategories = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/prompts/${user.id}/categories`);
			setCategories(response.data);
		} catch (error) {
			console.error('Error fetching categories:', error);
		}
	};

	const fetchPromptsInCategory = async (selectedCat) => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/prompts/${user.id}/categories/${selectedCat}`);
			setPromptsInCategory(response.data);
		} catch (error) {
			console.error('Error fetching prompts in category:', error);
		}
	};

	const handleCategoryChange = (event) => {
		const selectedCat = event.target.value;
		setSelectedCategory(selectedCat);
		fetchPromptsInCategory(selectedCat);
	};

	const handlePromptChange = (event) => {
		const promptId = parseInt(event.target.value);
		const selected = promptsInCategory.find((p) => p.id === promptId);
		setTitle(selected.title);
		setCategory(selected.category);
		setPrompt(selected.prompt);
		setSelectedPrompt(selected);
	};

	const deleteSelectedPrompt = () => {
		if (selectedPrompt) {
			axios
				.delete(`${process.env.REACT_APP_BACKEND_URL}/prompts/${user.id}/${selectedPrompt.id}`)
				.then(() => {
					console.log('Prompt deleted');
					fetchPromptsInCategory(selectedCategory);
					setTitle('');
					setCategory('');
					setPrompt('');
				})
				.catch((error) => {
					console.error('Error deleting prompt:', error);
				});
		}
	};

	// Function to fetch prompts
	const fetchPrompts = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/prompts/${user.id}/`);

			// if (response.data && response.data.length > 0) {
			// 	const promptData = response.data[0]; // Assuming you want to load the first prompt
			// 	setTitle(promptData.title);
			// 	setCategory(promptData.category);
			// 	setPrompt(promptData.prompt);
			// }
		} catch (error) {
			console.error('Error fetching prompts:', error);
		}
	};

	useEffect(() => {
		fetchPrompts();
		fetchCategories();
	}, []);

	const fetchPromptsAndUpdateState = async () => {
		// Fetch categories
		await fetchCategories();

		// If a category is selected, fetch the prompts for that category
		if (selectedCategory) {
			await fetchPromptsInCategory(selectedCategory);
		}
	};

	const handleSubmitPrompt = (event) => {
		event.preventDefault();

		// Add a debug statement to print user and user.id
		console.log('User:', user);
		console.log('User ID:', user.id);

		// Make a POST request to create a new user account
		axios
			.post(`${process.env.REACT_APP_BACKEND_URL}/prompts/${user.id}/`, {
				title: title,
				category: category,
				prompt: prompt,
				user_id: user.id,
			})
			.then((response) => {
				console.log('Prompt created:', response.data);
				fetchPromptsAndUpdateState();
				
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
				<label htmlFor="category-select">Select Category:</label>
				<select id="category-select" onChange={handleCategoryChange}>
					<option value="">--Select Category--</option>
					{categories.map((cat) => (
						<option value={cat} key={cat}>
							{cat}
						</option>
					))}
				</select>
				<label htmlFor="prompt-select">Select Prompt:</label>
				<select id="prompt-select" onChange={handlePromptChange}>
					<option value="">--Select Prompt--</option>
					{promptsInCategory.map((p) => (
						<option value={p.id} key={p.id}>
							{p.title}
						</option>
					))}
				</select>
				<button type="button" onClick={deleteSelectedPrompt}>Delete Prompt</button>
			</form>
		</div>
	);
};

export default PromptLibraryPage;
