// PromptLibrary.js

import { Button, Container, Form, FormGroup, Label, Input, Select, Dropdown, Alert } from 'reactstrap';
import React, { useCallback, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import axios from 'axios';

const PromptLibraryPage = ({ onLogOut, user }) => {
	const { id } = user;
	const [title, setTitle] = useState('');
	const [category, setCategory] = useState('');
	const [prompt, setPrompt] = useState('');
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [promptsInCategory, setPromptsInCategory] = useState([]);
	const [selectedPrompt, setSelectedPrompt] = useState(null);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleError = (error, message) => {
		console.error(message, error);
		setError(message);
	};

	const fetchCategories = useCallback(async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/prompts/${id}/categories/`);
			setCategories(response.data);
		} catch (error) {
			handleError(error, 'Failed to fetch categories. Please try again later.');
		}
	}, [id]);

	const fetchPromptsInCategory = useCallback(async (selectedCat) => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/prompts/${id}/categories/${selectedCat}/`);
			setPromptsInCategory(response.data);
		} catch (error) {
			handleError(error, 'Failed to fetch prompts in selected category. Please try again later.');
		}
	}, [id]);

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
				.delete(`${process.env.REACT_APP_BACKEND_URL}/prompts/${id}/${selectedPrompt.id}/`)
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
	const fetchPrompts = useCallback(async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/prompts/${id}/`);

			if (response.data && response.data.length > 0) {
				const promptData = response.data[0]; // Assuming you want to load the first prompt
				setTitle(promptData.title);
				setCategory(promptData.category);
				setPrompt(promptData.prompt);
			}
		} catch (error) {
			console.error('Error fetching prompts:', error);
		}
	}, [id]);

	useEffect(() => {
		fetchPrompts();
		fetchCategories();
	}, [fetchPrompts, fetchCategories]);

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

		// Add a debug statement to print and id
		console.log('User:', user);
		console.log('User ID:', id);

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
		<Container>
			<header className="bg-custom-header">
				<Container className="mt-5 custom-container">
					<div className="w-100 text-center p-3">
						<h1>Prompt Input</h1>
					</div>
						<Navigation handleLogOut={handleLogOut} user={user} />
				</Container>
			</header>
			<div className="bg-custom-box">
				<Container className="mt-5 custom-container">
					<Form id="prompt-form" onSubmit={handleSubmitPrompt} className="mt-4">
						<section id="save-prompt-section" className="mb-4">
							<FormGroup className="mb-3">
								<Label htmlFor="title">Title:</Label>
								<Input
									type="text"
									id="title"
									name="title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									required
								/>
							</FormGroup>
							<FormGroup className="mb-3">
								<Label htmlFor="category">Category:</Label>
								<Input
									type="text"
									id="category"
									name="category"
									value={category}
									onChange={(e) => setCategory(e.target.value)}
									required
								/>
							</FormGroup>
							<FormGroup className="mb-3">
								<Label htmlFor="prompt">Prompt:</Label>
								<Input
									type="textarea"
									id="prompt"
									name="prompt"
									rows="5"
									value={prompt}
									onChange={(e) => setPrompt(e.target.value)}
									required
								/>
							</FormGroup>
							<Button type="submit" color="primary">Save Prompt</Button>
						</section>




						<FormGroup className="mb-3">
							<Label htmlFor="category-select">Select Category:</Label>
							<Input
								type="select"
								id="category-select"
								onChange={handleCategoryChange}
							>
								<option value="">--Select Category--</option>
								{categories.map((cat) => (
									<option value={cat} key={cat}>
										{cat}
									</option>
								))}
							</Input>
						</FormGroup>
						<FormGroup className="mb-3">
							<Label htmlFor="prompt-select">Select Prompt:</Label>
							<Input
								type="select"
								id="prompt-select"
								onChange={handlePromptChange}
							>
								<option value="">--Select Prompt--</option>
								{promptsInCategory.map((p) => (
									<option value={p.id} key={p.id}>
										{p.title}
									</option>
								))}
							</Input>
						</FormGroup>
						<Button type="button" onClick={deleteSelectedPrompt} color="danger">Delete Prompt</Button>
						{error && <Alert color="danger">{error}</Alert>}
					</Form>
				</Container>	
			</div>
		</Container>			
	);
};

export default PromptLibraryPage;

