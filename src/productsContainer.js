import React from 'react';
import {Container, Form, FormGroup, Row, Input, Label, Button} from 'reactstrap';

const divStyle = {
		width: '17rem',

	};
const fontStyle = {
	fontFamily: 'Courier New',
}

class ProductComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return(
			<div className="col-lg-3 col-md-4 col-sm-12 product-item">
			   	<div className="card h-100 justify-content-sm-center" style={divStyle}>
			   		<img className="card-img-top img-fluid" src="img-PWA/portaLapiz.jpg" href="#" />
					<div className="card-body">
				    	<h4 className="card-title">PORTA LAPIZ <span className="badge badge-light">9</span></h4>
				  		<p className="card-text d-sm-block d-none">Vienen en colores surtidos</p>
				  	</div>
					<div className="card-footer">
	      				<small className="text-muted">$200</small>
			    	</div>
				</div>  
	   		</div>		
		);
	}
}

class CategoryComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//este array debe ser products por categoria
			products: [] 
		};
	}

	/**
	se supone que cada item tiene un codigo unico
	productsListCategory (products){
		return(
			products.map(item=> <ProductComponent product-item={item} key=item.codigo>)
		);
	}
	
	**/

	render() {
		return (
			//dentro de cada categoria debe listar los productos ProductComponent 
			<Container style = {fontStyle}>
				<h1>Librería</h1>
		  		<Row>
		   			<ProductComponent />
			  	</Row>
			</Container> 	
	  	);
		/**
		Si defino como antes en este render debo tener la llamada a la funcion productsListcategory
		this.productsListCategory(this.props.products);
		**/

	}
}


class ProductsContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categorys: []
		};
		//el array categorys debera ser un array de array de productos (all themmmm).
		//Deberia haber un if en el render antes del return para ver que no este vacio leght>0
		//con categorys.map puedo recorrer todo el array y listarlo.
	}
	
	/**
	productsList (categorys){
		return(
			products.map(products=> <Category>)
		);
	}
	
	**/
	
	render() {
		return (	
  			//por cada categoria voy a tener CategoryComponent
  			<CategoryComponent />
		);
	}
}

export default ProductsContainer;