import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import Shelves from './containers/Shelves';
import Search from './containers/Search';

const App = () => (
	<Router>
		<div className='ui container'>
			<Navigation />
			<Route path='/' exact component={Shelves} />
			<Route path='/search' component={Search} />
		</div>
	</Router>
);

export default App;
