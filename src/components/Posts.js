import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productActions';


class Products extends Component {
	/** Esto es parte de lo que ahora maneja redux
	constructor (props){
		super(props);
		this.state = {
			posts: []
		}
	}
	componentWillMount() {
		//console.log(123);
		fetch('https://jsonplaceholder.typicode.com/posts')
		.then(res => res.json())
		//.then(data => console.log(data));
		.then(data => this.setState({ posts: data }));
	}
	**/

	componentWillReceiveProps(nextProps) {
		if (nextProps.newProduct) {
			this.props.products.unshift(nextProps.newProduct);
		}
	}

	componentWillMount() {
		this.props.fetchProducts();
	}

	render() {
		const productItems = this.props.products.map( product => (
			
	   		<div key={ product.code } className="col-lg-3 col-md-4 col-sm-12">
				<div className="card h-100 justify-content-sm-center" >
			   		<img className="card-img-top img-fluid" src="img-PWA/portaLapiz.jpg" href="#" />
					<div className="card-body">
				    	<h4 className="card-title">{ product.product }
				    		<span className="badge badge-light float-right">{ product.cant_product }</span>
				    	</h4>
					  	<p className="card-text d-sm-block d-none">{ product.description }</p>
					  	<div className="alert alert-danger" role="alert">
					  		{ product.code }
  							This is a danger alert—check it out!
					  		}
						</div>
					</div>
					<div className="card-footer">
		      			<small className="text-muted">{ product.price_end }</small>
			    	</div>
				</div>  
	   		</div>		
			));
		return (
			<div className="container">
				<div className="row justify-content-between">
					<h1> Listado de Productos</h1>
					<button className="col-lg-3 btn btn-info" onClick={() => this.props.history.push("/newProduct")}>Nuevo</button>
				</div>
				<br/>
				<div className="row">
					{ productItems }
				</div>
			</div>
			);
	}
}

Products.proptypes = {
	fetchProducts: PropTypes.func.isRequired, 
	products: PropTypes.array.isRequired,
	newProduct: PropTypes.object
}

const mapStateToprops = state => ({
	products: state.products.items,
	newProduct: state.products.item
});

export default connect(mapStateToprops, { fetchProducts })(Products);