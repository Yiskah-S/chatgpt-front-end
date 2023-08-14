// Dashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Navigation from './Navigation';

const Dashboard = ({ onLogOut, user }) => {
	const [targetWebsite, setTargetWebsite] = useState('');
	const [outputFormat, setOutputFormat] = useState('notion');
	const [outputVisible, setOutputVisible] = useState(false);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [promptsInCategory, setPromptsInCategory] = useState([]);
	const [selectedPrompt, setSelectedPrompt] = useState(null);
	const [serverResponse, setServerResponse] = useState(null);
	const [responseId, setResponseId] = useState(null);
	const navigate = useNavigate();

	const handleError = (error, message) => {
		console.error(message, error);
		// alert(message);
	};

	const fetchCategories = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/prompts/${user.id}/categories/`);
			setCategories(response.data);
		} catch (error) {
			handleError(error, 'Failed to fetch categories. Please try again later.');
		}
	};

	const fetchPromptsInCategory = async (selectedCat) => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/prompts/${user.id}/categories/${selectedCat}/`);
			setPromptsInCategory(response.data);
		} catch (error) {
			handleError(error, 'Failed to fetch prompts in selected category. Please try again later.');
		}
	};

	const handleCategoryChange = (event) => {
		const selectedCat = event.target.value;
		setSelectedCategory(selectedCat);
		fetchPromptsInCategory(selectedCat);
	};

	const handlePromptChange = (event) => {
		const promptId = parseInt(event.target.value);
		const prompt = promptsInCategory.find((p) => p.id === promptId);
		console.log('Selected Prompt:', prompt);
		setSelectedPrompt(prompt); 
	};
	const handleRunCrawler = async () => {
		const dataToSend = {
			targetWebsite,
			prompt_id: selectedPrompt ? selectedPrompt.id : null,
		};
		console.log('Data to send:', dataToSend);
		try {
			const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/dashboard/${user.id}/`, dataToSend);
			setServerResponse(response.data.response); // Use the response text
			setResponseId(response.data.response_id); // Store the response ID
			setOutputVisible(true);
		} catch (error) {
			console.error('Error setting target website:', error);
		}
	};
	
	const handleSaveResults = async () => {
		const dataToSend = {
			response_id: responseId, // Include the response ID here
			outputFormat, // Include the selected output format
		};
		try {
			const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/dashboard/${user.id}/save/`, dataToSend);
	
			if (response.data.message === 'Saved successfully') {
				alert('Results saved successfully!');
			} else {
				alert('Error saving results: ' + response.data.message);
			}
		} catch (error) {
			console.error('Error saving results:', error);
			alert('An error occurred while saving the results. Please try again.');
		}
	};

	const handleLogOut = () => {
		onLogOut();
		navigate('/');
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<div className="container">
			<header>
				<h1>Dashboard</h1>
				<Navigation handleLogOut={handleLogOut} />
				<h2>Hi, {user.username}!</h2>
			</header>
			<main>
				<section id="crawl-section">
					<h2>Crawl Website</h2>
					<label htmlFor="target-website">Target Website:</label>
					<input
						type="text"
						id="target-website"
						name="target-website"
						value={targetWebsite}
						onChange={(e) => setTargetWebsite(e.target.value)}
						required
					/>
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
					{selectedPrompt && (
						<div className="selected-prompt">
							<h3>Selected Prompt:</h3>
							<p>{selectedPrompt.prompt}</p>
						</div>
					)}
					<button type="button" id="run-button" onClick={handleRunCrawler}>Run Crawler</button>
				</section>
					{outputVisible && (
					<section id="output-section">
						<h2>Output Results:</h2>
						<p>Target Website: {targetWebsite}</p>
						<p>Selected Prompt: {selectedPrompt ? selectedPrompt.prompt : 'None'}</p>
						{/* <p>Output Format: {outputFormat}</p> */}
						<p>Server Response: {serverResponse}</p> {/* Displaying the server response */}
					</section>
					)}
					{/* <button type="button" id="run-button" onClick={handleRunCrawler}>Run Crawler</button> */}
					<label htmlFor="output-format">Save to:</label>
					<select
						id="output-format"
						name="output-format"
						value={outputFormat}
						onChange={(e) => setOutputFormat(e.target.value)}
					>
						<option value="notion">Notion</option>
						<option value="txt">.txt</option>
						<option value="md">.md</option>
						<option value="google-docs">Google Docs</option>
				</select>
				<button type="button" onClick={handleSaveResults}>Save Results</button> {/* Save Results Button */}
			</main>
		</div>
	);
};
	
export default Dashboard;
	