import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProduct, createProduct } from '../actions/productActions';

const PORCENTAGE = 0.3;

class PostForm extends Component {
	constructor (props){
		super(props);
		this.state = {
			code: '',
			product: '',
			description: '',
			price: '',
			price_end: ''
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.getTotal = this.getTotal.bind(this);
		this.onClickSearch = this.onClickSearch.bind(this);
	}

	onChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	onClickSearch(event) {
		if (this.state.code !== null) {
			this.props.fetchProduct(this.state.code);
		}
	}

	getTotal() {
		if (this.state.price === '') {
			return 0.0;
		}
		const porcentage = parseFloat(this.state.price) * PORCENTAGE ;
		const total = parseFloat(this.state.price) + porcentage;
		return total;
	}

	onSubmit(event) {
		event.preventDefault();
		const product = {
			code: this.state.code,
			product: this.state.product,
			description:  this.state.description,
			price: this.price,
			price_end: this.getTotal()
		}
		//call action
		console.log('carga producto', product);
		this.props.createProduct(product);
		this.props.history.push("/stock");
	}
	render() {
		return (
			<div className="container">
				<h1> Agregar un Producto Nuevo </h1>
				<div className="alert alert-primary" role="alert">
					Verificar que el código a ingresar no este ingresado aun!
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
						<div className="form-group col-sm-8">
							<label className="col-form-label" htmlFor="product">Producto: </label> <br />
							<input className="form-control" type="text" name="product" id="product" onChange={this.onChange} value={ this.state.product } />
						</div>
					</div>
					<div className="row">
						<div className="form-group col-sm-6">
							<label className="col-form-label" htmlFor="price">Precio: </label> <br />
							<input className="form-control" type="text" name="price" id="price" onChange={this.onChange} value={this.state.price} />
						</div>
						<div className="form-group col-sm-6">
							<label className="col-form-label" htmlFor="price_end">Precio de Venta: </label> <br />
							<input className="form-control" type="text" name="price_end" id="price_end" value={this.getTotal()} readOnly />
						</div>
					</div>
					<div className="row">
						<div className="form-group col-sm-12">
							<label className="col-form-label" htmlFor="description">Descripción: </label> <br />
							<textarea className="form-control" name="description" id="description" rows="3" onChange={this.onChange} value={ this.state.description } />
						</div>
					</div>
					<br />
					<div className="row justify-content-md-center">
						<button className="col-md-2 btn btn-danger" onClick={() => this.props.history.push("/")}> Cancelar </button>
						<button className="col-md-2  btn btn-info" type="submit" onClick={this.onSubmit} > Cargar </button>
					</div>
				</form>
			</div>
			);
	}
}

const mapStateToProps = state=> ({
	product: state.products.item,
	newProduct: state.products.newProduct
});

const mapDispatchToProps = {fetchProduct, createProduct}; 

PostForm.Proptypes = {
	fetchProduct: Proptypes.func.isRequired,
	newProduct: Proptypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

//PostForm es un formulario para dar de alta un nuevo producto a la venta. 
// Cuando ingreso el codigo del producto a crear debo verificar que no haya otro con ese mismo