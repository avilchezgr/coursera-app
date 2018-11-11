import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import comments from '../shared/comments';
class DishDetailComponent extends Component{
	
	render(){	
		let  dish  = this.props.selectedDish;
		if (dish !== null && dish !== undefined) {
			
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
			<div className="col-12 col-md-5 m-1">
				<CardBody>
				<CardTitle>{comments.title}</CardTitle>
				<CardText>{comments.comments}</CardText>
			  </CardBody>
			</div>
			</React.Fragment>
		  );
		} else {
		  return (
			<div></div>
		  );
		}
	}
	
	
}

export default DishDetailComponent;