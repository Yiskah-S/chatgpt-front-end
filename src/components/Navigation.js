// navigation.js

import { Button, Container, Navbar, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import React from 'react';

// Navigation bar component for the application
const Navigation = ({ handleLogOut, user }) => (
	<Navbar className="bg-light border border-success p-3 rounded">
		<Container className="d-flex justify-content-center">
			<Nav className="mx-auto">
				<NavItem>
					<Button tag={Link} to="/dashboard" outline color="primary" className="m-2">Dashboard</Button>
				</NavItem>
				<NavItem>
					<Button tag={Link} to="/prompt-library" outline color="primary" className="m-2">Prompt Library</Button>
				</NavItem>
				<NavItem>
					<Button tag={Link} to="/api-keys" outline color="primary" className="m-2">API Keys Page</Button>
				</NavItem>
				<NavItem>
					<Button tag={Link} to="/account-details" outline color="primary" className="m-2">Account Details</Button>
				</NavItem>
				<NavItem>
					<Button onClick={handleLogOut} color="primary" className="m-2">Log Out</Button>
				</NavItem>
			</Nav>
		</Container>
		<div className="w-100 text-center p-3">
			<h2>Hi, {user.username}!</h2>
		</div>
	</Navbar>
);

export default Navigation;