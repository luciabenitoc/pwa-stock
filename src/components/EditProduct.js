import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProduct, updateProduct } from '../actions/productActions';

class EditProduct extends Component {
	constructor (props){
		super(props);
		this.state = {
			name: '',
			code: '',
			price: '',
			price_end: '',
			cant: '',
			description: '',
			imagen:''
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
			name: this.state.name,
			description: this.state.description,
			price: this.state.price,
			price_end: this.state.price_end,
			cant: this.state.cant,
			imagen: this.state.imagen
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
				'name': nextProps.product.name,
				'description': nextProps.product.description,
				'price': nextProps.product.price,
				'price_end': nextProps.product.price_end,
				'cant': nextProps.product.cant,
				'imagen': nextProps.product.imagen
			});
		}
	}

	render(){
		if (this.props.loading) {
			return <div className="d-flex justify-content-center"><span>Cargando...</span></div>;
		}
		return (
			<div className="container">
				<h1> Editar Producto </h1>
				<div className="alert alert-primary" role="alert">
					Verificar que el código a editar se encuentre previamente en stock!
				</div>
				<form onSubmit={this.onSubmit}>
					<div className="row">
						<div className="form-group col-sm-2">
							<label className="col-form-label" htmlFor="code">Código: </label> <br />
							<div className="input-group">
								<input className="form-control" type="text" name="code" id="code" onChange={this.onChange} value={ this.state.code } />
								<div className="input-group-append">
						    		<button onClick={this.onClickSearch} className="btn btn-outline-secondary" type="button"><i className="fa fa-thumbs-up"></i></button>
						  		</div>
						  	</div>
						</div>
						<div className="form-group col-sm-6" style={{display: this.state.name ? 'block' : 'none' }}>
							<label className="col-form-label" htmlFor="name">Producto: </label> <br />
							<input className="form-control" type="text" name="name" id="name" onChange={this.onChange} value={ this.state.name } />
						</div>
						<div className="form-group col-sm-4" style={{display: this.state.name ? 'block' : 'none' }}>
							<label className="col-form-label" htmlFor="imagen">Imagen: </label> <br />
							<input className="form-control" type="text" name="imagen" id="imagen" onChange={this.onChange} value={ this.state.imagen} /> 
						</div>
					</div>
					<div style={{display: this.state.name ? 'block' : 'none' }}>
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
								<label className="col-form-label" htmlFor="cant">Cantidad: </label> <br />
								<input className="form-control" type="text" name="cant" id="cant" onChange={this.onChange} value={this.state.cant} />
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
						<button className="col-md-2  btn btn-info" type="submit" onClick={this.onSubmit} style={{display: this.state.name ? 'block' : 'none' }}> Guardar </button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateProps = state=> ({
	product: state.products.item,
	notFoundProduct: state.products.notFoundProduct,
	loading: state.products.loading
});

const mapDispatchToProps = {fetchProduct, updateProduct}; 

EditProduct.Proptypes = {
	fetchProduct: Proptypes.func.isRequired,
	updateProduct: Proptypes.func.isRequired
}

export default connect(mapStateProps, mapDispatchToProps)(EditProduct);