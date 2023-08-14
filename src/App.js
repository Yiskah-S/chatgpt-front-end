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
	const [isCreateAccountVisible, setIsCreateAccountVisible] = useState(true);
	const [loginError, setLoginError] = useState('');
	const [user, setUser] = useState(null);

	const handleSignInClick = async (email, password) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			if (response.ok) {
				const userData = await response.json();
				setUser(userData); // Store user data on successful login
				setLoggedIn(true);
				setLoginError(''); // Clear any previous login error
			} else {
				const errorData = await response.json();
				setLoginError(errorData.error || 'Invalid username/password');
			}
		} catch (error) {
			console.error('Error during login:', error);
			setLoginError('Something went wrong during login.');
		}
	};

	const handleCreateAccountClick = () => {
		setIsCreateAccountVisible(true);
		setLoggedIn(false);
	};

	const handleLogOut = () => {
		setUser(null); // Clear user data on logout
		setLoggedIn(false);
		setIsCreateAccountVisible(false);
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
							<Route
								path="/signin"
								element={
									<LogInPage
										onSignInClick={handleSignInClick}
										onLogOut={handleLogOut}
										onCreateAccountClick={handleCreateAccountClick}
										setUser={setUser}
									/>
								}
							/>
							<Route
								path="/create-account"
								element={<CreateAccount onCreateAccountClick={handleCreateAccountClick} />}
							/>
						</>
					)}
				</Routes>
			</div>
		</Router>
	);
};



export default App;
