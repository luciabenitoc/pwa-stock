import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostForm from './PostForm';
import Posts from './Posts';
import PostSaleForm from './PostSaleForm';
import MenuAdmin from './MenuAdmin';


const Root = ({ store }) => (
 	<Provider store={store}>
    	<Router>
    		<div>
      			<Route exact path="/" component={MenuAdmin} />
      			<Route path="/list" component={Posts} />
      			<Route path="/newSale" component= {PostSaleForm} />
      			<Route path="/new" component={PostForm} />
      			<Route path="/edit" component={PostForm} />
      		</div>
    	</Router>
  	</Provider>
);

Root.proptypes = {
	store: PropTypes.object.isRequired,
};


export default Root;