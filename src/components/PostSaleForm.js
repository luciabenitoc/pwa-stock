import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProduct } from '../actions/productActions';


class PostSaleForm extends Component {
	constructor (props){
		super(props);
		this.state = {
			code:'',
			product: '',
			description: '',
			price:'',
			client:''
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
		const post = {
			code: this.state.code,
			product: this.state.product,
			description: this.state.description,
			price: this.state.value,
			cant: this.state.cant,
			client: this.state.client
		}
	}

	onClickSearch(event) {
		if (this.state.code !== null) {
			this.props.fetchProduct(this.state.code);
		} 
		//call action
		//this.props.createPost(post);
	}
	render() {
		console.log(this.props);
		return (
			<div className="container"> 
				<h1> Agregar una Venta </h1>
				<form onSubmit={this.onSubmit}>
					<div className="row">
						<div className="form-group col-sm-4">
							<label className="col-sm-2 col-form-label" htmlFor="code">Código: </label> <br />
							<div className="input-group">
								<input className="form-control" type="text" name="code" id="code" onChange={this.onChange} value={ this.state.code } />
								<div className="input-group-append">
					    			<button onClick={this.onClickSearch} className="btn btn-outline-secondary" type="button"><i className="fa fa-thumbs-up"></i></button>
					  			</div>
							</div>					
						</div>
						<div className="form-group col-sm-8">
							<label className="col-sm-2 col-form-label" htmlFor="product">Producto: </label> <br />
							<input className="form-control" type="text" name="product" id="product" onChange={this.onChange} value={ this.state.product } disabled/>
						</div>
					</div>
					<div className="row">	
						<div className="form-group col-sm-12">
							<label className="col-sm-2 col-form-label" htmlFor="description">Descripción: </label> <br />
							<textarea className="form-control" name="description" id="description" rows="3" onChange={this.onChange} value={ this.props.product.description } disabled/>
						</div>
					</div>
					<div className="row">
						<div className="form-group col-sm-6">
							<label className="col-sm-2 col-form-label" htmlFor="price">Precio: </label> 
							<input className="form-control" type="text" name="price" id="price" onChange={this.onChange} value={ this.state.price } disabled/>
						</div>
						<div className="form-group col-sm-6">
							<label className="col-sm-2 col-form-label" htmlFor="cant">Cantidad: </label> <br />
							<input className="form-control" type="text" name="cant" id="cant" onChange={this.onChange} value={ this.state.cant} disabled/>
						</div>
					</div>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label" htmlFor="client">Cliente: </label> <br />
						<div className="col-sm-10">
							<input className="form-control" type="text" name="client" id="client" onChange={this.onChange} value={ this.state.client } />
						</div>
					</div>
					<br />
					<div className="row justify-content-md-center">
						<button className="col-md-2 btn btn-danger" onClick={() => this.props.history.push("/")}> Cancelar </button>
						<button className="col-md-2  btn btn-info" type="submit"> Cargar </button>
					</div>
				</form>
			</div>
			);
	}
}

const mapStateToprops = state => ({
	product: state.posts.item
});



PostSaleForm.Proptypes = {
	fetchProduct: Proptypes.func.isRequired,
	product: Proptypes.object
}

export default connect(mapStateToprops, { fetchProduct })(PostSaleForm);

//PostForm es un formulario para dar de alta una nueva venta realizada. 
//Debe traer los datos del producto a partir de su codigo de producto.
//Debo poder guardar el nombr ey apellido de a quien se realizo la venta, para mas adelante poder capturar deudas y lanzar alertas.
//Una vez cargada la venta se debe ver reflejado en el stock.