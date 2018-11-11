import React, {Component} from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import './MainComponent.css';
import Menu from './MenuComponent';
import { DISHES } from "../shared/dishes";
import DishDetailComponent from './DishDetailComponent';


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
        {/* navbar component */}
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        {/* use of a React component we've created */}
        {/* make this component's state available to child components via props*/}
		<div className="container"> 
			 <div className="row">
				<Menu dishes={this.state.dishes} selectDish={this.handleSelectDish}/>
			</div>
			<div className="row">
				<DishDetailComponent selectedDish={this.state.dishes.filter( (dish) => dish.id === this.state.selectedDish)[0]}/>
			</div>
		</div>
        
      </div>
    );
  }
  handleSelectDish = (selectedDish) =>{
	  this.setState({selectedDish:selectedDish});
  }
  
}

export default Main;