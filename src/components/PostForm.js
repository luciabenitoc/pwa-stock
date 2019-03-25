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
			name: '',
			description: '',
			price: '',
			price_end: '',
			cant: '',
			imagen:'',
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.getTotal = this.getTotal.bind(this);
	}

	onChange(event) {
		this.setState({[event.target.name]: event.target.value});
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
			name: this.state.name,
			description:  this.state.description,
			price: this.state.price,
			price_end: this.getTotal(),
			cant: this.state.cant,
			imagen: this.state.imagen
		}
		//call action
		console.log('carga producto', product);
		this.props.createProduct(product);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.product) {
			this.setState({
				'name': nextProps.product.name,
				'description': nextProps.product.description,
				'price_end': nextProps.product.price_end,
				'imagen': nextProps.product.imagen
			});
		}
		if (nextProps.newProduct) {
			this.props.history.push("/stock");
		}
	}

	render() {
		return (
			<div className="container">
				<h1> Agregar un Producto Nuevo </h1>
				<div className="alert alert-primary" role="alert">
					Aun no verifica que el codigo ingresado no este ya cargado!
				</div>
				<form onSubmit={this.onSubmit}>
					<div className="row">
						<div className="form-group col-sm-2">
							<label className="col-form-label" htmlFor="code">Código: </label> <br />
							<div className="input-group">
								<input className="form-control" type="text" name="code" id="code" onChange={this.onChange} value={ this.state.code } />
						  	</div>
						</div>
						<div className="form-group col-sm-6">
							<label className="col-form-label" htmlFor="name">Producto: </label> <br />
							<input className="form-control" type="text" name="name" id="name" onChange={this.onChange} value={ this.state.name } />
						</div>
						<div className="form-group col-sm-4">
							<label className="col-form-label" htmlFor="imagen">Imagen: </label> <br />
							<input className="form-control" type="text" name="imagen" id="imagen" onChange={this.onChange} value={ this.state.imagen} /> 
						</div>
					</div>
					<div className="row">
						<div className="form-group col-sm-4">
							<label className="col-form-label" htmlFor="price">Precio: </label> <br />
							<input className="form-control" type="text" name="price" id="price" onChange={this.onChange} value={this.state.price} />
						</div>
						<div className="form-group col-sm-4">
							<label className="col-form-label" htmlFor="price_end">Precio de Venta: </label> <br />
							<input className="form-control" type="text" name="price_end" id="price_end" value={this.getTotal()} readOnly />
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