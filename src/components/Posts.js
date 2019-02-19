import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';


class Posts extends Component {
	/** Esto es parte de lo que ahora maneja redux
	constructor (props){
		super(props);
		this.state = {
			posts: []
		}
	}
	componentWillMount() {
		//console.log(123);
		fetch('https://jsonplaceholder.typicode.com/posts')
		.then(res => res.json())
		//.then(data => console.log(data));
		.then(data => this.setState({ posts: data }));
	}
	**/

	componentWillReceiveProps(nextProps) {
		if (nextProps.newPost) {
			this.props.posts.unshift(nextProps.newPost);
		}
	}

	componentWillMount() {
		this.props.fetchPosts();
	}

	render() {
		const postItems = this.props.posts.map( post => (
			
	   		<div key={ post.id } className="col-lg-3 col-md-4 col-sm-12">
				<div className="card h-100 justify-content-sm-center" >
			   		<img className="card-img-top img-fluid" src="img-PWA/portaLapiz.jpg" href="#" />
					<div className="card-body">
				    	<h4 className="card-title">{ post.title }<span className="badge badge-light">9</span></h4>
					  	<p className="card-text d-sm-block d-none">{ post.body }</p>
					</div>
					<div className="card-footer">
		      			<small className="text-muted">$200</small>
			    	</div>
				</div>  
	   		</div>		
			));
		return (
			<div className="container">
				<div className="row justify-content-between">
					<h1> Listado de Productos</h1>
					<button className="col-lg-3 btn btn-info" onClick={() => this.props.history.push("/new")}>Nuevo</button>
				</div>
				<br/>
				<div className="row">
					{ postItems }
				</div>
			</div>
			);
	}
}

Posts.proptypes = {
	fetchPosts: PropTypes.func.isRequired, 
	posts: PropTypes.array.isRequired,
	newPost: PropTypes.object
}

const mapStateToprops = state => ({
	posts: state.posts.items,
	newPost: state.posts.item
});

export default connect(mapStateToprops, { fetchPosts })(Posts);