import React, { useState } from 'react';
import CreateAccount from './components/CreateAccount';
import LogInPage from './components/LogInPage';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [isCreateAccountVisible, setIsCreateAccountVisible] = useState(true);

	const handleSignInClick = () => {
		setLoggedIn(true);
	};

	const handleCreateAccountClick = () => {
		setIsCreateAccountVisible(true);
		setLoggedIn(false);
	};

	const handleLogOut = () => {
		setLoggedIn(false);
		setIsCreateAccountVisible(false); 
	};

	return (
		<div>
			<h1>ChatGPT Crawler Site</h1>
			{loggedIn ? (
				<Dashboard onLogOut={handleLogOut} />
			) : (
				<div>
					{isCreateAccountVisible ? (
						<CreateAccount onSignInClick={handleSignInClick} />
					) : (
						<LogInPage onCreateAccountClick={handleCreateAccountClick} onSignInClick={handleSignInClick} />
					)}
				</div>
			)}
		</div>
	);
};

export default App;
