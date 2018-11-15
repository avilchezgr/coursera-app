import React, {Component} from 'react';
import './MainComponent.css';
import Menu from './MenuComponent';
import DishDetailComponent from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import  {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps = state =>{
		return {
			dishes: state.dishes,
			leaders: state.leaders,
			promotions: state.promotions,
			comments: state.comments
		}
	}

class Main extends Component {

  constructor(props) {
    super(props);

  }
	

  render() {
	const HomeComponent = () => {
		return (
		<Home 
			dish= {this.props.dishes.filter( (dish) => dish.featured)[0]}
			comment= {this.props.comments.filter( (comment) =>comment.featured)[0]}
			promotion= {this.props.promotions.filter( (promotion) =>promotion.featured)[0]}
			leader= {this.props.leaders.filter( (leader) =>leader.featured)[0]}
		/>);
	};
	const DishWithId = ({match})  => {
		return (
			<DishDetailComponent selectedDish={this.props.dishes.filter( (dish) => dish.id === parseInt(match.params.dishId,10))[0]}
			comments={this.props.comments.filter( (comment) => comment.dishId === parseInt(match.params.dishId,10))}/>
		);
	};
	const AboutComponent = () => {
		return(
			<About
				leaders={this.props.leaders}
			/>);
	}; 
    return (
		<div>
			<Header/>
			<Switch>
				<Route path="/home" component={HomeComponent}/> 
				<Route exact path="/contactus" component={Contact}/> 
				<Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} selectDish={this.handleSelectDish}/>}/> 
				<Route path="/menu/:dishId" component={DishWithId} />
				<Route exact path="/about" component={AboutComponent} />
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





export default withRouter(connect(mapStateToProps)(Main));