// navigation.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ handleLogOut }) => (
	<nav>
		<Link to="/dashboard">Dashboard</Link>
		<Link to="/prompt-library">Prompt Library</Link>
		<Link to="/api-keys">API Keys Page</Link>
		<Link to="/account-details">Account Details</Link>
		<button onClick={handleLogOut}>Log Out</button>
	</nav>
);

export default Navigation;
