// UseAuth.js

import { useState } from 'react';

const UseAuth = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState(null);

	const handleSignIn = async (email, password) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			if (response.ok) {
				const userData = await response.json();
				const authToken = userData.authToken;
				// Save the authToken to local storage
				localStorage.setItem('authToken', authToken);
				setUser(userData); // Store user data on successful login
				setLoggedIn(true);
			} else {
				const errorData = await response.json();
				// Handle login errors here
				console.error('Login Error:', errorData.error || 'Invalid username/password');
			}
		} catch (error) {
			console.error('Error during login:', error);
			// Handle network or other errors here
		}
	};

	const handleLogOut = () => {
		// Clear the authToken from local storage
		localStorage.removeItem('authToken');
		setUser(null); // Clear user data on logout
		setLoggedIn(false);
	};

	return { loggedIn, user, handleSignIn, handleLogOut };
};

export default UseAuth;
