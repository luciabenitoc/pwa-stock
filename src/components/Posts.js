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
		if (this.props.loading) {
			return <div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>;
		}

		const productItems = this.props.products.map( product => (
			
	   		<div key={ product.code } className="col-lg-3 col-md-4 col-sm-12 card-product">
				<div className="card h-100 justify-content-sm-center">
					<div className="card-body">
						<img className="card-img-top img-fluid" src={ product.imagen } href="#" />
					</div>
					<div className="card-footer">
						<div className="row">
							<h1 className="card-title">{ product.code }-</h1>
							<h1 className="card-title">{ product.product }</h1>
						</div>
					  	<p className="card-text d-sm-block d-none">{ product.description }</p>
		      			<small className="text-muted">${ product.price_end }</small>
		      			<span className="badge badge-cant float-right">{ product.cant }</span>
			    	</div>
				</div>  
	   		</div>		
			));
		return (
			<div className="container">
				<div className="row justify-content-between">
					<h1 className="menu-title"> Listado de Productos</h1>
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
	newProduct: state.products.item,
	loading: state.products.loading
});

export default connect(mapStateToprops, { fetchProducts })(Products);