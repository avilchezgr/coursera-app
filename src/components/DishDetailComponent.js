import React, {Component} from 'react';
import {Label, Col, Row, Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, 
ModalBody, ModalFooter, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {LocalForm, Control, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';

 const minLength = (len) => (val) => (val && (val.length >= len));
 const maxLength = (len) => (val) => (!(val) || (val.length <= len));

class CommentForm extends Component{
	
	constructor(props){
		super(props);
		this.state = {modal:false};
	}
	
	toggle = () =>{
		this.setState({
			modal: !this.state.modal
		});
	}
	handleSubmit = (values) =>{
		this.toggle();
		this.props.postComment(this.props.dishId, values.rating,values.author,values.comment);
	}
	render(){
		return (
		<div>
			<Button outline color="secondary" onClick={this.toggle}><span className="fa fa-pencil"></span> Submit Comment</Button> 
			<Modal isOpen={this.state.modal} toggle={this.toggle}>
				<ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
				<ModalBody>
					<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
						<Row className="form-group">
							<Label htmlFor="rating" md={12}>Rating</Label>
							<Col >
								<Control.select  
									className="form-control" model=".rating" name="rating">
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</Control.select>
							</Col>
						</Row>
						
						
						<Row className="form-group">
							<Col md={12}>
								<Label htmlFor="author">Your Name</Label>
							</Col>
							<Col md={12}>
								<Control.text model=".author" id="name" name="author" 
									className="form-control"
									placeholder="Your Name"
									validators={{minLength:minLength(3),maxLength:maxLength(15)}}
								/>
								<Errors 
										className="text-danger" 
										model=".author"
										show="touched"
										messages={{
											minLength: 'Must be greater than 2 characters',
											maxLength: 'Must be 15 characters or less'
										}}
									/>
							</Col>
						</Row>
						<Row className="form-group">
							<Label htmlFor="comment" md={12}>Comment</Label>
							<Col>
								<Control.textarea model=".comment" id="comment" name="comment" className="form-control" rows="5"></Control.textarea>
							</Col>
						</Row>
						<Button type="submit" color="primary">Submit</Button>
					</LocalForm>
				</ModalBody>
				<ModalFooter>
				</ModalFooter>
			</Modal>
		</div>
		);
	}
}





const  DishDetailComponent = (props) =>{

	let  dish  = props.selectedDish;
	if(props.isLoading){
		return(
			<div className="container">
				<div className="row">
					<Loading />
				</div>
			</div>
		);
	} else if(props.errMess){
			return(
			<div className="container">
				<div className="row">
					<h4>{props.errMess}</h4>
				</div>
			</div>
		);
	}else if (dish != null ) {
		
		return (
		  
			<div className="container">
			<div className="row">
				<Breadcrumb>
						<BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
						<BreadcrumbItem active>{dish.name}</BreadcrumbItem>
				</Breadcrumb>
				<div className="col-12">
					<h3>{dish.name}</h3>
					<hr/>
				</div>
			</div>
			<div className="row">
					  <div className="col-12 col-md-5 m-1">
					    <FadeTransform in transformProps={{
							exitTransform: 'scale(0.5) translateY(-50%)'
						}}>
							<Card>
							  <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
							  <CardBody>
								<CardTitle>{dish.name}</CardTitle>
								<CardText>{dish.description}</CardText>
							  </CardBody>
							</Card>
						</FadeTransform>
					  </div>
				  
					 
						<DishDetailComments 
							comments = {props.comments}
							postComment={props.postComment}
							dishId={dish.id}
						/>
			
			</div>
			</div>
		);
	} else {
	  return (
		<div></div>
	  );
	}
		
	
	
	
}

const DishDetailComments = ({comments,postComment,dishId}) =>{
	
	
	
	
	
	
	
	return (
		<div className="col-12 col-md-5 m-1">
			<h4>Comments</h4>
				<ul className="list-unstyled">
				<Stagger in>
				{
					comments.map( (comment) => {
						return (
							<Fade in>
								<li key={comment.id}>
									<p>
									{comment.comment}
									</p>
									<p>
									--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
									</p>
								</li>
							</Fade>
						);
					})
				}
				</Stagger>
				</ul>
			<CommentForm dishId={dishId} postComment={postComment}/>
		</div>
	
	);
}


export default DishDetailComponent;