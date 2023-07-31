import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateAccount from './components/CreateAccount';
import LogInPage from './components/LogInPage';
import Dashboard from './components/Dashboard';
import PromptLibrary from './components/PromptLibrary';
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
		<Router>
			<div>
				<h1>ChatGPT Crawler Site</h1>
				<Routes>
					<Route path="/" element={
						loggedIn ? (
							<Dashboard onLogOut={handleLogOut} />
						) : (
							<div>
								{isCreateAccountVisible ? (
									<CreateAccount onSignInClick={handleSignInClick} />
								) : (
									<LogInPage onCreateAccountClick={handleCreateAccountClick} onSignInClick={handleSignInClick} />
								)}
							</div>
						)
					} />
					<Route path="/prompt-library" element={<PromptLibrary />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
