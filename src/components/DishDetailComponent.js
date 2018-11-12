import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

const  DishDetailComponent = (props) =>{

	let  dish  = props.selectedDish;
	if (dish != null ) {
		
	  return (
	  <React.Fragment>
	  <div className="col-12 col-md-5 m-1">
		<Card>
		  <CardImg width="100%" src={dish.image} alt={dish.name}/>
		  <CardBody>
			<CardTitle>{dish.name}</CardTitle>
			<CardText>{dish.description}</CardText>
		  </CardBody>
		</Card>
		</div>
		<DishDetailComments 
			comments = {dish.comments}
		/>
		</React.Fragment>
	  );
	} else {
	  return (
		<div></div>
	  );
	}
		
	
	
	
}

const DishDetailComments = ({comments}) =>{
	
	const commentList = comments.map( (comment) => {
		return (<div key={comment.id}>
			<p>
			{comment.comment}
			</p>
			<p>
			--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
			</p>
		</div>);
	});
	
	return (
		<div className="col-12 col-md-5 m-1">
			<CardBody>
			<CardTitle>Comments</CardTitle>
			<CardText>{commentList}</CardText>
		  </CardBody>
		</div>
	
	);
}


export default DishDetailComponent;