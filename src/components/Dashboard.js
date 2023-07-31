import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogInPage from './LogInPage';

const Dashboard = ({ onLogOut }) => {
	const [targetWebsite, setTargetWebsite] = useState('');
	const [selectedPrompts, setSelectedPrompts] = useState([]);
	const [outputFormat, setOutputFormat] = useState('');
	const [outputVisible, setOutputVisible] = useState(false);

	// Example of prompts in the user's library
	const prompts = [
		{ value: 'prompt1', text: 'Prompt 1' },
		{ value: 'prompt2', text: 'Prompt 2' },
		{ value: 'prompt3', text: 'Prompt 3' },
		// Add more prompts as needed
	];

	const handleRunCrawler = () => {
		setOutputVisible(true);
	};

    const handleLogOut = () => {
		// Perform any logout actions or state updates as needed
		// For this example, we'll simply call the onLogOut function passed as a prop
		onLogOut();
	};


	return (
		<div className="container">
			<header>
				<h1>Dashboard</h1>
				<nav>
					<Link to="/">Home</Link>
					<Link to="/prompt-library">Prompt Library</Link>
					<a href="#">API Keys Page</a>
					<button onClick={onLogOut}>Log Out</button>
				</nav>
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
					<label htmlFor="prompt-selection">Select Prompts:</label>
					<select
						id="prompt-selection"
						name="prompt-selection"
						multiple
						required
						value={selectedPrompts}
						onChange={(e) => setSelectedPrompts(Array.from(e.target.selectedOptions, option => option.textContent))}
					>
						{/* Populate this with prompts from the user's library */}
						{prompts.map(prompt => (
							<option key={prompt.value} value={prompt.value}>{prompt.text}</option>
						))}
					</select>
					<label htmlFor="output-format">Output Format:</label>
					<select
						id="output-format"
						name="output-format"
						required
						value={outputFormat}
						onChange={(e) => setOutputFormat(e.target.value)}
					>
						<option value="notion">Notion</option>
						<option value="txt">.txt</option>
						<option value="md">.md</option>
						<option value="google-docs">Google Docs</option>
					</select>
					<button type="button" id="run-button" onClick={handleRunCrawler}>Run Crawler</button>
				</section>
				{outputVisible && (
					<section id="output-section">
						<h2>Output Results</h2>
						<p>Target Website: {targetWebsite}</p>
						<p>Selected Prompts: {selectedPrompts.join(', ')}</p>
						<p>Output Format: {outputFormat}</p>
					</section>
				)}
			</main>
		</div>
	);
};

export default Dashboard;