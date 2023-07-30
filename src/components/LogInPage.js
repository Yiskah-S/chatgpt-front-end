import React from 'react';

const LogInPage = ({ onCreateAccountClick, onSignInClick }) => {
	return (
		<div className="container">
			<h1>ChatGPT Crawler Site</h1>
			<div id="signin-form" className="visible">
				<h2>Sign In</h2>
				<form id="signin-form">
					<label htmlFor="email">Email:</label>
					<input type="email" id="email" name="email" required />
					
					<label htmlFor="password">Password:</label>
					<input type="password" id="password" name="password" required />

					<button type="submit" onClick={onSignInClick}>Sign In</button>
				</form>
				<p>Don't have an account? <a href="#" onClick={onCreateAccountClick}>Create Account</a></p>
			</div>
		</div>
	);
};

export default LogInPage;
