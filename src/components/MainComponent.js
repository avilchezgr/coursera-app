import React, {Component} from 'react';
import './MainComponent.css';
import Menu from './MenuComponent';
import { DISHES } from "../shared/dishes";
import DishDetailComponent from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

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
    return (
      <div>
        <Header/>
		<div className="container"> 
			 <div className="row">
				<Menu dishes={this.state.dishes} selectDish={this.handleSelectDish}/>
			</div>
			<div className="row">
				<DishDetailComponent selectedDish={this.state.dishes.filter( (dish) => dish.id === this.state.selectedDish)[0]}/>
			</div>
		</div>
        <Footer/>
      </div>
    );
  }
  handleSelectDish = (selectedDish) =>{
	  this.setState({selectedDish:selectedDish});
  }
  
}

export default Main;