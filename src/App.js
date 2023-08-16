// App.js

import { Button, Container, NavItem, Alert, NavLink } from 'reactstrap';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AccountDetails from './components/AccountDetails';
import PromptLibrary from './components/PromptLibrary';
import CreateAccount from './components/CreateAccount';
import APIKeysPage from './components/APIKeysPage';
import LogInPage from './components/LogInPage';
import Dashboard from './components/Dashboard';
import React, { useState } from 'react';


const LandingPage = () => {
	return (
		<Container>
			<header className="bg-custom-header">
				<Container className="mt-5 custom-container">
					<div className="w-100 text-center p-3">
						<h1>Welcome to ChatGPT Crawler Site</h1>
					</div>
				</Container>
			</header>

			<div className="bg-custom-box">
				<Container className="mt-5 custom-container">
					<main>
						<Container className="text-center">
							<p class="lead" >
							This is a lead paragraph. It stands out from regular paragraphs.
							</p>
							<p>Explanation of how the website works goes here.</p>					
							<Button tag={Link} to="/create-account" color="primary" className="m-2">Create Account</Button>
							<Button tag={Link} to="/signin" color="primary" className="m-2">Sign In</Button>
						</Container>
					</main>
				</Container>
			</div>
		</Container>
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
			<Container>
				{loginError && <Alert color="danger">{loginError}</Alert>}
				<Routes>
					<Route path="/" element={<LandingPage user={user} onLogOut={handleLogOut} />} />
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
			</Container>
		</Router>
	);
};

export default App;
