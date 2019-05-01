import React from 'react';

import {
		GamePage
 } from '../pages';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import './app.css';

const App = () => {
	return (
		<div className="wrapper font">
			<Router>
				{/*<Route path="/" component={FirstPage} exact/>*/}
				<Route path="/" component={GamePage}/>
			</Router>
		</div>
		
	)
}

export default App;