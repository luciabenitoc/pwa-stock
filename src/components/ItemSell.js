import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProduct, createSell } from '../actions/productActions';


class ItemsSell extends Component {
	constructor (props){
		super(props);
		this.state = {
			code:'',
			name: '',
			description: '',
			price_end:'',
			cant_sell:'',
			total:'',
			client:'',
			imagen:''
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onClickSearch = this.onClickSearch.bind(this);
	}

	onChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	getTotal() {
		if (this.state.cant_sell==='') {
			return 0.0;
		}
		const total = parseFloat(this.state.price_end * this.state.cant_sell);
		return total;
	}

	onSubmit(event) {
		event.preventDefault();
		const sell = {
			code: this.state.code,
			name: this.state.name,
			description: this.state.description,
			price_end: this.state.price_end,
			cant_sell: this.state.cant_sell,
			imagen: this.state.imagen,
			total: this.getTotal(), 
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

	//componentReceiveProps() se lanza cuando se tiene nuevas props
	componentWillReceiveProps(nextProps) {
		if (nextProps.product) {
			this.setState({
				'name': nextProps.product.name,
				'description': nextProps.product.description,
				'price_end': nextProps.product.price_end,
				'cant': nextProps.product.cant,
				'imagen': nextProps.product.imagen
			});
			console.log('culo', nextProps.product.code);

			//this.props.itemsSell.unshift(nextProps.product);
			console.log('nuevo', nextProps.product);
		}
		if (nextProps.newSell) {
			console.log('vendido', nextProps.newSell);
			this.props.history.push("/");
		}
	}

	//componentWillUpdate(nextProps) {
		//se ejecuta antes del render quizas deba hacer aqui la magia :(
	//}

	render() {
		if (this.props.loading) {
			return <div className="d-flex justify-content-center"><span>Cargando...</span></div>;
		}
//Si hay una nueva busqeuda, deberia hacer otro <li>, quizas en el componentReceiveProps
//Tengo que ver si lo que viene en this.props.fetchProduct() es un codigo valido, deberia hacer otro <li> y no pisar el que esta
		const item = (
			<li className="list-group-item">
				<div className="media align-items-center">
  					<img className="img-fluid img-xs d-none d-sm-block" src={ this.state.imagen }/>
  					<div className="media-body">			
    					<div className="row align-items-center mb-0">
    						<label className="mt-0 col-sm-2" value={this.state.name}> {this.state.name}</label>
							<label className="col-5 col-sm-2" htmlFor="price_end" value={this.state.price_end}> <i className="fa fa-dollar-sign"> </i>  {this.state.price_end} x </label>
							<input className="form-control col-3" placeholder="Cantidad" type="number" name="cant_sell" id="cant_sell" max={this.state.cant} min="1" onChange={this.onChange} value={ this.state.cant_sell} disabled={!this.state.name}/>							
							<label className="col-4" htmlFor="total" value={this.getTotal()}> = {this.getTotal()}</label>				
						</div>
  					</div>
				</div>
			</li>
		);
		return (
			<div className="container">
				<div className="row ml-0 mr-0">
					<label className="col-form-label" htmlFor="client">Cliente: </label> 
					<input type="text" className="form-control" placeholder="Nombre" aria-label="Nombre" aria-describedby="basic-addon2" name="client" id="client" onChange={this.onChange} value={ this.state.client }/>
				</div> 
				<div className="row ml-0 align-items-center">
					<div className="col pl-0">
						<label className="col-form-label" htmlFor="code">Código: </label> <br />
						<div className="input-group">
							<input className="form-control" type="text" name="code" id="code" onChange={this.onChange} value={ this.state.code } />
							<div className="input-group-append">
						   		<button onClick={this.onClickSearch} className="btn btn-outline-secondary" type="button"><i className="fa fa-thumbs-up"></i></button>
							</div>
						</div>
					</div>
					<div className="col">
						<label></label><br/><br/>
						<div className="alert alert-primary" role="alert" style={{display: this.props.notFoundProduct ? 'block' : 'none' }}>
							Verifiqué el código!
						</div>
					</div>
				</div>
				
				<form className="row ml-0 mr-0" style={{display: this.state.name ? 'block' : 'none' }}>
					<ul className="list-unstyled">
						<br/>
						{ item }
					</ul>
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
	loading: state.products.loading,
	notFoundProduct: state.products.notFoundProduct
});

const mapDispatchToProps = {fetchProduct, createSell};

ItemsSell.Proptypes = {
	fetchProduct: Proptypes.func.isRequired,
	product: Proptypes.object,
	itemsSell: Proptypes.array.isRequired,
	newSell: Proptypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsSell);