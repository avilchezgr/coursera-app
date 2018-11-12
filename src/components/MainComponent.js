import React, {Component} from 'react';
import './MainComponent.css';
import Menu from './MenuComponent';
import { DISHES } from "../shared/dishes";
import DishDetailComponent from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import  {Switch, Route, Redirect} from 'react-router-dom';

class Main extends Component {
  /**
   * Constructor
   * @param props properties
   */
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
	  selectedDish: null
    };
  }

  /**
   * All React components must
   * implement the render() method
   */
  render() {
	const HomeComponent = () => {
		return <Home />
	};
    return (
		<div>
			<Header/>
			<Switch>
				<Route path="/home" component={HomeComponent}/> 
				<Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} selectDish={this.handleSelectDish}/>}/> 
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