// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateAccount from './components/CreateAccount';
import LogInPage from './components/LogInPage';
import Dashboard from './components/Dashboard';
import PromptLibrary from './components/PromptLibrary';
import AccountDetails from './components/AccountDetails';
import APIKeysPage from './components/APIKeysPage';
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
	const [loginError, setLoginError] = useState(null);

	// Handler for user sign-in
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
				setUser(userData); 
				setLoggedIn(true);
				setLoginError(''); 
			} else {
				const errorData = await response.json();
				setLoginError(errorData.error || 'Invalid username/password');
			}
		} catch (error) {
			console.error('Error during login:', error);
			setLoginError('Something went wrong during login.');
		}
	};

	// Handler for user account creation
	const handleCreateAccountClick = () => {
		setLoggedIn(false);
	};

	// Handler for user logout
	const handleLogOut = () => {
		setUser(null); 
		setLoggedIn(false);
	};

	return (
		<Router>
			<div>
				<h1>ChatGPT Crawler Site</h1>
				{loginError && <p className="error">{loginError}</p>}
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
