// index.js

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import './scss/custom.scss';
import React from 'react';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// Production build does not include performance measurement code
if (process.env.NODE_ENV === 'development') {
	reportWebVitals(console.log);
}
