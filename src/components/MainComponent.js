import React, {Component} from 'react';
import './MainComponent.css';
import Menu from './MenuComponent';

import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";

import DishDetailComponent from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import  {Switch, Route, Redirect} from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
	  comments: COMMENTS,
	  promotions: PROMOTIONS,
	  leaders: LEADERS
    };
  }


  render() {
	const HomeComponent = () => {
		return (
		<Home 
			dish= {this.state.dishes.filter( (dish) => dish.featured)[0]}
			comment= {this.state.comments.filter( (comment) =>comment.featured)[0]}
			promotion= {this.state.promotions.filter( (promotion) =>promotion.featured)[0]}
			leader= {this.state.leaders.filter( (leader) =>leader.featured)[0]}
		/>);
	};
	const DishWithId = ({match})  => {
		return (
			<DishDetailComponent selectedDish={this.state.dishes.filter( (dish) => dish.id === parseInt(match.params.dishId,10))[0]}
			comments={this.state.comments.filter( (comment) => comment.dishId === parseInt(match.params.dishId,10))}/>
		);
	};
    return (
		<div>
			<Header/>
			<Switch>
				<Route path="/home" component={HomeComponent}/> 
				<Route exact path="/contactus" component={Contact}/> 
				<Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} selectDish={this.handleSelectDish}/>}/> 
				<Route path="/menu/:dishId" component={DishWithId} />
				<Redirect to="/home" />
			</Switch>
			<Footer/>
        </div>
   
    );
  }
  handleSelectDish = (selectedDish) =>{
	  this.setState({selectedDish:selectedDish});
  }
  
}

export default Main;