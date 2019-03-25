import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productActions';

class Sells extends Component {

	render() {
		if (this.props.loading) {
			return <div className="d-flex justify-content-center"><span>Cargando...</span></div>;
		}
}