// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateAccount from './components/CreateAccount.js';
import LogInPage from './components/LogInPage.js';
import Dashboard from './components/Dashboard.js';
import PromptLibrary from './components/PromptLibrary.js';
import AccountDetails from './components/AccountDetails.js';
import APIKeysPage from './components/APIKeysPage.js';
import './App.css';

const LandingPage = () => {
	return (
		<div className="container">
			<h1>Welcome to ChatGPT Crawler Site</h1>
			<p>Explanation of how the website works goes here.</p>
			<Link to="/signin">Sign In</Link>
			<Link to="/create-account">Create Account</Link>
		</div>
	);
};

const App = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState(null);


	const handleLogOut = () => {
		setUser(null); // Clear user data on logout
		setLoggedIn(false);
	};

	return (
		<Router>
			<div>
				<h1>ChatGPT Crawler Site</h1>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					{loggedIn ? (
						<>
							<Route path="/dashboard" element={<Dashboard user={user} onLogOut={handleLogOut} />} />
							<Route path="/api-keys" element={<APIKeysPage user={user} onLogOut={handleLogOut} />} />
							<Route path="/prompt-library" element={<PromptLibrary user={user} onLogOut={handleLogOut} />} />
							<Route path="/account-details" element={<AccountDetails user={user} onLogOut={handleLogOut} />} />
						</>
					) : (
						<>
							<Route path="/signin" element={<LogInPage user={setUser} setLoggedIn={setLoggedIn} />} />
							<Route path="/create-account" element={<CreateAccount user={user} onCreateAccountClick={setLoggedIn} />} />
						</>
					)}
				</Routes>
			</div>
		</Router>
	);
};



export default App;

// Dashboard.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = ({ onLogOut, user, handleLogOut}) => { // Include user in props
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
		// Make an API call to the backend to run the crawler
		// Use the targetWebsite, selectedPrompts, and outputFormat state variables as needed
		// For example, if the backend expects the targetWebsite, selectedPrompts, and outputFormat as query parameters:
		// const response = await axios.get('/crawl', {
		// 	params: {
		// 		targetWebsite,
		// 		selectedPrompts,
		// 		outputFormat,
		// 	},
		// });
		// const output = response.data;
		// setOutput(output);
	};

	// const navigate = useNavigate();

	useEffect(() => {
		// Function to fetch user data from the backend
		const fetchUserData = async () => {
			try {
				// Make an API call to the backend to get user data
				const response = await axios.get('/users/dashboard');
		
				// Assuming the response contains the user data
				const userData = response.data;
		
				// Update the state with the retrieved user data
				// For example, if user data includes the targetWebsite, selectedPrompts, and outputFormat:
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};
	
		// Call the fetchUserData function
		fetchUserData();
	  }, []); // The empty dependency array ensures the effect runs only once after the initial render.
	

	return (
		<div className="container">
			<header>
				<h1>Dashboard</h1>
				<h2>Hi, {user.username}!</h2>
				<nav>
					<Link to="/">Home</Link>
					<Link to="/prompt-library">Prompt Library</Link>
					<Link to="/api-keys">API Keys Page</Link>
					<Link to="/account-details">Account Details</Link>
					<button onClick={handleLogOut}>Log Out</button>
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
// LogInPage.js

import React, { useState } from 'react';
import axios from 'axios';
import './LogInPage.css';
import { Link, useNavigate } from 'react-router-dom';

const LogInPage = ( setUser, setLoggedIn ) => {  
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
	
		try {
			// Adds debug statement to check the endpoint being called
			console.log('Sending login request...');

			const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
				email: email,
				password: password,
			});
			
			console.log('Login response:', response.data);

			if (response.status === 200) {
				const { access_token } = response.data;
				localStorage.setItem('token', access_token);
				// setUser(response.data.user);
				// setLoggedIn(true);
				console.log('Login successful!');
				navigate('/dashboard')
			}
		} catch (error) {
			console.error('Error logging in user:', error);
		}
	};

	return (
		<div className="container">
			<h1>ChatGPT Crawler Site</h1>
			<Link to="/">Home</Link>
			<div id="log-in" className="visible">
				<h2>Log In</h2>
				<form id="log-in-form" onSubmit={handleSubmit}>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<button type="submit">Log In</button>
				</form>
				<p>
				Don't have an account? 
					<Link to="/create-account">Create Account</Link>
				</p>
			</div>
		</div>
	);
};

export default LogInPage;
