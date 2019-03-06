import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { createProduct } from '../actions/productActions';

class MenuAdmin extends Component {

	render() {
		return (
			<div className="container">
				<br/>
				<h1 className="d-none d-sm-block"> Menú Administración </h1>
				<div className="list-group">
					
					<a onClick={() => this.props.history.push("/newSell")} className="list-group-item list-group-item-action">
						<div className="d-flex w-100 justify-content-between">
      						<h4 className="card-title"><i className="far fa-file-alt"></i> Cargar Venta</h4>
      						<small>3 days ago</small>
      						<small className="sr-only sr-only-focusable">Fecha en que se cargo la ultima venta</small>
    					</div>
    					<p className="mb-1">Permite cargar los datos de una venta. Producto vendido, a quien.</p>
					</a>

					<a onClick={() => this.props.history.push("/listSell")} className="list-group-item list-group-item-action">
						<div className="d-flex w-100 justify-content-between">
      						<h4 className="card-title"><i className="far fa-list"></i> Listar Ventas</h4>
      						<small>3 days ago</small>
      						<small className="sr-only sr-only-focusable">Fecha en que se listo por ultima vez</small>
    					</div>
    					<p className="mb-1">Permite listar todas las ventas cargadas, en orden.</p>
					</a>
					
					<a onClick={() => this.props.history.push("/edit")} className="list-group-item list-group-item-action">
						<div className="d-flex w-100 justify-content-between">
      						<h4 className="card-title"><i className="far fa-edit"></i> Editar Producto / Actualizar Stock</h4>
      						<small>3 days ago</small>
    					</div>
    					<p className="mb-1">Permite actualizar el stock o editar producto existente.</p>
    					<small>Pensar como lograr esta doble funcionalidad.</small>
					</a>

					<a onClick={() => this.props.history.push("/stock")} className="list-group-item list-group-item-action">
						<div className="d-flex w-100 justify-content-between">
      						<h4 className="card-title"><i className="far fa-eye"></i> Ver Stock</h4>
      						<small>3 days ago</small>
      						<small className="sr-only sr-only-focusable">Fecha de ultima actualización de stock.</small>
    					</div>
    					<p className="mb-1">Permite visualizar el stock existente. Genera una lista de productos con cantidades existentes.</p>
					</a>
				</div>
			</div>
		);
	}
} 

export default connect(null)(MenuAdmin);