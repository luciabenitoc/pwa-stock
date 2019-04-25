import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostForm from './PostForm';
import Posts from './Posts';
import SellForm from './SellForm';
import EditProduct from './EditProduct';
import MenuAdmin from './MenuAdmin';
//Los componentes que quiero probar sone estos
import ItemSell from './ItemSell';



const Root = ({ store }) => (
 	<Provider store={store}>
    	<Router>
    		<div>
      			<Route exact path="/" component={MenuAdmin} />
      			<Route path="/stock" component={Posts} />
      			<Route path="/newSell" component= {SellForm} />
            {/* <Route path="/listSell" component= {ListSell} /> */}
            <Route path="/itemSell" component= {ItemSell} />
      			<Route path="/newProduct" component={PostForm} />
      			<Route path="/edit" component={EditProduct} />
      		</div>
    	</Router>
  	</Provider>
);

Root.proptypes = {
	store: PropTypes.object.isRequired,
};

export default Root;