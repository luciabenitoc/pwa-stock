import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProduct, updateProduct } from '../actions/productActions';

class SearchCodeForEdit extends Component {
	constructor (props){
		super(props);
		this.state = {
			product: '',
			code: '',
			price: '',
			price_end: '',
			cant_product: '',
			description: ''
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onClickSearch = this.onClickSearch.bind(this);
	}

	onChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	onSubmit(event) {
		event.preventDefault();
		const product = {
			code: this.state.code,
			product: this.state.product,
			description: this.state.description,
			price: this.state.price,
			price_end: this.state.price_end,
			cant_product: this.state.cant_product
		}
		//call action
		console.log('mande a guardar producto', product);
		this.props.updateProduct(product);
	}

	onClickSearch(event) {
		if (this.state.code !== null) {
			this.props.fetchProduct(this.state.code);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.product) {
			this.setState({
				'product': nextProps.product.product,
				'description': nextProps.product.description,
				'price': nextProps.product.price,
				'price_end': nextProps.product.price_end,
				'cant_product': nextProps.product.cant_product
			});
		}
	}

	render(){
		return (
			<div className="container">
				<h1> Editar Producto </h1>
				<div className="alert alert-primary" role="alert">
					Verificar que el código a ingresar sea correcto!
				</div>
				<form onSubmit={this.onSubmit}>
					<div className="row">
						<div className="form-group col-sm-4">
							<label className="col-form-label" htmlFor="code">Código: </label> <br />
							<div className="input-group">
								<input className="form-control" type="text" name="code" id="code" onChange={this.onChange} value={ this.state.code } />
								<div className="input-group-append">
						    		<button onClick={this.onClickSearch} className="btn btn-outline-secondary" type="button"><i className="fa fa-thumbs-up"></i></button>
						  		</div>
						  	</div>
						</div>
						<div className="form-group col-sm-8" style={{display: this.state.product ? 'block' : 'none' }}>
							<label className="col-form-label" htmlFor="product">Producto: </label> <br />
							<input className="form-control" type="text" name="product" id="product" onChange={this.onChange} value={ this.state.product } />
						</div>
					</div>
					<div style={{display: this.state.product ? 'block' : 'none' }}>
						<div className="row">
							<div className="form-group col-sm-4">
								<label className="col-form-label" htmlFor="price">Precio: </label> <br />
								<input className="form-control" type="text" name="price" id="price" onChange={this.onChange} value={this.state.price} />
							</div>
							<div className="form-group col-sm-4">
								<label className="col-form-label" htmlFor="price_end">Precio de Venta: </label> <br />
								<input className="form-control" type="text" name="price_end" id="price_end" onChange={this.onChange} value={this.state.price_end} />
							</div>
							<div className="form-group col-sm-4">
								<label className="col-form-label" htmlFor="cant_product">Cantidad: </label> <br />
								<input className="form-control" type="text" name="cant_product" id="cant_product" onChange={this.onChange} value={this.state.cant_product} />
							</div>
						</div>
						<div className="row">
							<div className="form-group col-sm-12">
								<label className="col-form-label" htmlFor="description">Descripción: </label> <br />
								<textarea className="form-control" name="description" id="description" rows="3" onChange={this.onChange} value={ this.state.description } />
							</div>
						</div>
					</div>
					
					<br />
					<div className="row justify-content-md-center">
						<button className="col-md-2 btn btn-danger" onClick={() => this.props.history.push("/")}> Cancelar </button>
						<button className="col-md-2  btn btn-info" type="submit" onClick={this.onSubmit} > Guardar </button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateProps = state=> ({
	product: state.products.item
});

const mapDispatchToProps = {fetchProduct, updateProduct}; 

SearchCodeForEdit.Proptypes = {
	fetchProduct: Proptypes.func.isRequired,
	updateProduct: Proptypes.func.isRequired
}

export default connect(mapStateProps, mapDispatchToProps)(SearchCodeForEdit);