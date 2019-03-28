import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProduct, createSell } from '../actions/productActions';


class PostSaleForm extends Component {
	constructor (props){
		super(props);
		this.state = {
			code:'',
			name: '',
			description: '',
			price_end:'',
			cant_sell:'',
			total:'',
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
		const sell = {
			code: this.state.code,
			name: this.state.name,
			description: this.state.description,
			price_end: this.state.price_end,
			cant_sell: this.state.cant_sell,
			total: (this.state.price_end * this.state.cant_sell), 
			client: this.state.client
		}
		console.log('onsubmit',sell);
		this.props.createSell(sell);
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
				'price_end': nextProps.product.price_end,
				'cant': nextProps.product.cant
			});
		}
		if (nextProps.newSell) {
			console.log('vendido', nextProps.newSell);
			this.props.history.push("/");
		}
	}

	render() {
		if (this.props.loading) {
			return <div className="d-flex justify-content-center"><span>Cargando...</span></div>;
		}
		console.log(this.props);
		return (
			<div className="container"> 
				<h1> Agregar una Venta </h1>
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
							<label className="col-form-label" htmlFor="name">Producto: </label> <br />
							<input className="form-control" type="text" name="name" id="name" onChange={this.onChange} value={ this.state.name } disabled/>
						</div>
					</div>
					<div className="row">	
						<div className="form-group col-sm-12">
							<label className="col-form-label" htmlFor="description">Descripción: </label> <br />
							<textarea className="form-control" name="description" id="description" rows="3" onChange={this.onChange} value={ this.state.description } disabled/>
						</div>
					</div>
					<div className="row">
						<div className="col-md-3 col-6">
							<div className="form-group">
								<label className="col-form-label" htmlFor="price_end">Precio: </label> 
								<input className="form-control" type="text" name="price_end" id="price_end" onChange={this.onChange} value={ this.state.price_end } disabled/>
							</div>
						</div>
						<div className="col-md-3 col-6">
							<div className="form-group">
								<label className="col-form-label" htmlFor="cant_sell">Cantidad: </label> <br />
								<input className="form-control" type="number" name="cant_sell" id="cant_sell" max={this.state.cant} min="1" onChange={this.onChange} value={ this.state.cant_sell} disabled={!this.state.name}/>
							</div>
						</div>
						<div className="col-md-6 col-12">
							<div className="form-group">
								<label className="col-form-label" htmlFor="total">Total:</label>
								<input className="form-control" type="text" name="total" id="total" value={this.state.price_end * this.state.cant_sell} disabled/>
							</div> 
						</div>
					</div>
					<div className="row">
						<div className="form-group col-sm-12">
							<label className="col-form-label" htmlFor="client">Cliente: </label> <br />
							<input className="form-control" type="text" name="client" id="client" onChange={this.onChange} value={ this.state.client } disabled={!this.state.name}/>
						</div>
					</div>
					<br />
					<div className="row justify-content-md-center">
						<button className="col-md-2 btn btn-cancel" onClick={() => this.props.history.push("/")}> Cancelar </button>
						<button className="col-md-2  btn btn-info" type="submit" onClick={this.onSubmit}> Cargar </button>
					</div>
				</form>
			</div>
			);
	}
}

const mapStateToProps = state => ({
	product: state.products.item,
	newSell: state.products.newSell,
	loading: state.products.loading
});

const mapDispatchToProps = {fetchProduct, createSell};

PostSaleForm.Proptypes = {
	fetchProduct: Proptypes.func.isRequired,
	product: Proptypes.object,
	newSell: Proptypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(PostSaleForm);

//PostForm es un formulario para dar de alta una nueva venta realizada. 
//Debe traer los datos del producto a partir de su codigo de producto.
//Debo poder guardar el nombr ey apellido de a quien se realizo la venta, para mas adelante poder capturar deudas y lanzar alertas.
//Una vez cargada la venta se debe ver reflejado en el stock.