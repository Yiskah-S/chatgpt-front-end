// Dashboard.js

import { Button, Container, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import axios from 'axios';

const Dashboard = ({ onLogOut, user }) => {
	const [targetWebsite, setTargetWebsite] = useState('');
	const [outputFormat, setOutputFormat] = useState('notion');
	const [outputVisible, setOutputVisible] = useState(false);
	const [categories, setCategories] = useState([]);
	const [, setSelectedCategory] = useState('');
	const [promptsInCategory, setPromptsInCategory] = useState([]);
	const [selectedPrompt, setSelectedPrompt] = useState(null);
	const [serverResponse, setServerResponse] = useState(null);
	const [responseId, setResponseId] = useState(null);
	const navigate = useNavigate();

	const handleError = (error, message) => {
		console.error(message, error);
	};

	// Fetch categories
	const fetchCategories = useCallback (async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/prompts/${user.id}/categories/`);
			setCategories(response.data);
		} catch (error) {
			handleError(error, 'Failed to fetch categories. Please try again later.');
		}
	}, [user.id]);

	// Fetch prompts in selected category
	const fetchPromptsInCategory = async (selectedCat) => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/prompts/${user.id}/categories/${selectedCat}/`);
			setPromptsInCategory(response.data);
		} catch (error) {
			handleError(error, 'Failed to fetch prompts in selected category. Please try again later.');
		}
	};

	// Handler for category selection
	const handleCategoryChange = (event) => {
		const selectedCat = event.target.value;
		setSelectedCategory(selectedCat);
		fetchPromptsInCategory(selectedCat);
	};

	// Handler for prompt selection
	const handlePromptChange = (event) => {
		const promptId = parseInt(event.target.value);
		const prompt = promptsInCategory.find((p) => p.id === promptId);
		console.log('Selected Prompt:', prompt);
		setSelectedPrompt(prompt); 
	};

	// Handler for running the crawler
	const handleRunCrawler = async () => {
		const dataToSend = {
			targetWebsite,
			prompt_id: selectedPrompt ? selectedPrompt.id : null,
		};
		console.log('Data to send:', dataToSend);
		try {
			const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/dashboard/${user.id}/`, dataToSend);
			setServerResponse(response.data.response_text); // Use the response text
			console.log('Response ID:', response.data.response_id);
			console.log('Response:', response.data.response_text);
			setResponseId(response.data.response_id); // Store the response ID
			setOutputVisible(true);
		} catch (error) {
			console.error('Error setting target website:', error);
		}
	};
	
	// Handler for saving results
	const handleSaveResults = async () => {
		const dataToSend = {
			response_id: responseId,
		};
	
		try {
			let response;
			if (outputFormat === 'txt') {
				response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/dashboard/${user.id}/save_txt/`, dataToSend);
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', `response_${responseId}.txt`);
				document.body.appendChild(link);
				link.click();
			} else if (outputFormat === 'md') {
				response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/dashboard/${user.id}/save_md/`, dataToSend);
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', `response_${responseId}.md`);
				document.body.appendChild(link);
				link.click();
			} else if (outputFormat === 'notion') {
				response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/dashboard/${user.id}/save_notion/`, dataToSend);
				displayNotionMessage(true);
			}
		} catch (error) {
			console.error('Error saving results:', error);
			if (outputFormat === 'notion') {
				displayNotionMessage(false);
			}
		}
	};
	
	const displayNotionMessage = (success) => {
		const messageElement = document.getElementById('notion-message');
		if (success) {
			messageElement.textContent = 'Successfully posted to Notion.';
		} else {
			messageElement.textContent = 'Failed to post to Notion.';
		}
	};
	
	const handleLogOut = () => {
		onLogOut();
		navigate('/');
	};

	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);


	return (
		<Container>
			<header className="bg-custom-header">
				<Container className="mt-5 custom-container">
					<div className="w-100 text-center p-3">
						<h1>Dashboard</h1>
					</div>
				<Navigation handleLogOut={handleLogOut} user={user} />
				</Container>
			</header>
			
			<div className="bg-custom-box">
				<Container className="mt-5 custom-container">
					<main>
						<section id="crawl-section" className="mb-4">
							<Form>
								<FormGroup>
									<Label htmlFor="target-website">Target Website:</Label>
									<Input type="text" id="target-website" name="target-website" value={targetWebsite} onChange={(e) => setTargetWebsite(e.target.value)} required />
								</FormGroup>
								<FormGroup>
									<Label htmlFor="category-select">Select Category:</Label>
									<Input type="select" id="category-select" onChange={handleCategoryChange}>
										<option value="">--Select Category--</option>
										{categories.map((cat) => (
											<option value={cat} key={cat}>
												{cat}
											</option>
										))}
									</Input>
								</FormGroup>
								<FormGroup>
									<Label htmlFor="prompt-select">Select Prompt:</Label>
									<Input type="select" id="prompt-select" onChange={handlePromptChange}>
										<option value="">--Select Prompt--</option>
										{promptsInCategory.map((p) => (
											<option value={p.id} key={p.id}>
												{p.title}
											</option>
										))}
									</Input>
								</FormGroup>
								{selectedPrompt && (
									<div className="selected-prompt">
										<h3>Selected Prompt:</h3>
										<p>{selectedPrompt.prompt}</p>
									</div>
								)}
								<Button type="button" id="run-button" color="primary" onClick={handleRunCrawler}>Run Crawler</Button>
							</Form>
						</section>
						{outputVisible && (
						<section id="output-section" className="mb-4">
							<h3>Output Results:</h3>
							<p>Target Website: {targetWebsite}</p>
							<p>Selected Prompt: {selectedPrompt ? selectedPrompt.prompt : 'None'}</p>
							<p>Server Response: {serverResponse}</p>
						</section>
						)}
						<FormGroup>
							<Label htmlFor="output-format">Save to:</Label>
							<Input type="select" id="output-format" name="output-format" value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)}>
								<option value="notion">Notion</option>
								<option value="txt">.txt</option>
								<option value="md">.md</option>
								<option value="google-docs">Google Docs</option>
							</Input>
						</FormGroup>
						<Button type="button" color="success" onClick={handleSaveResults}>Save Results</Button>
						<div id="notion-message" className="strong-text"></div>
					</main>
				</Container>
			</div>
		</Container>
	);
};

export default Dashboard;