import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../actions/postActions';

class MenuAdmin extends Component {

	render() {
		return (
			<div className="container">
				<h1 className="d-sm-inline"> Menú </h1>
				<div className="list-group">
					
					<a onClick={() => this.props.history.push("/newSale")} className="list-group-item list-group-item-action">
						<div className="d-flex w-100 justify-content-between">
      						<h4 className="card-title"><i className="far fa-file-alt"></i> Cargar Venta</h4>
      						<small>3 days ago</small>
    					</div>
    					<p className="mb-1">Permite cargar los datos de una venta. Producto vendido, a quien.</p>
    					<small>Fecha en que se cargo la ultima venta o nombre de la ultima venta cargada.</small>
					</a>
					
					<a onClick={() => this.props.history.push("/edit")} className="list-group-item list-group-item-action">
						<div className="d-flex w-100 justify-content-between">
      						<h4 className="card-title"><i className="far fa-edit"></i> Editar Producto / Actualizar Stock</h4>
      						<small>3 days ago</small>
    					</div>
    					<p className="mb-1">Permite actualizar el stock o editar prodcuto existente.</p>
    					<small>Pensar como lograr esta doble funcionalidad.</small>
					</a>

					<a onClick={() => this.props.history.push("/list")} className="list-group-item list-group-item-action">
						<div className="d-flex w-100 justify-content-between">
      						<h4 className="card-title"><i className="far fa-eye"></i> Ver Stock</h4>
      						<small>3 days ago</small>
    					</div>
    					<p className="mb-1">Permite visualizar el stock existente. Genera una lista de productos con cantidades existentes.</p>
    					<small>Fecha de ultima actualización de stock.</small>
					</a>
				</div>
			</div>
		);
	}
} 

export default connect(null)(MenuAdmin);