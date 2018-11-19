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
import {postComment, postFeedback, fetchDishes, fetchComments, fetchPromos, fetchLeaders} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const mapDispatchToProps = (dispatch) => ({
	postComment:(dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
	postFeedback:(firstName, lastName, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstName, lastName, telnum, email, agree, contactType, message)),
	fetchDishes: () => {dispatch(fetchDishes())},
	fetchComments: () => {dispatch(fetchComments())},
	fetchPromos: () => {dispatch(fetchPromos())},
	fetchLeaders: () => {dispatch(fetchLeaders())},
	resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
});

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
	
  componentDidMount() {
	  this.props.fetchDishes();
	  this.props.fetchComments();
	  this.props.fetchPromos();
	  this.props.fetchLeaders();
  }
  
  
  
  render() {
	const HomeComponent = () => {
		return (
		<Home 
			dish= {this.props.dishes.dishes.filter( (dish) => dish.featured)[0]}
			dishesLoading = {this.props.dishes.isLoading}
			dishesErrMess={this.props.dishes.errMess}
			comment= {this.props.comments.comments.filter( (comment) =>comment.featured)[0]}
			promotion= {this.props.promotions.promotions.filter( (promotion) =>promotion.featured)[0]}
			promosLoading = {this.props.promotions.isLoading}
			promosErrMess = {this.props.promotions.errmess}
			
			leader= {this.props.leaders.leaders.filter( (leader) =>leader.featured)[0]}
			leaderErrMess = {this.props.leaders.errmess}
			leadersLoading= {this.props.leaders.leadersLoading}
		/>);
	};
	const DishWithId = ({match})  => {
		return (
			<DishDetailComponent selectedDish={this.props.dishes.dishes.filter( (dish) => dish.id === parseInt(match.params.dishId,10))[0]}
			isLoading = {this.props.dishes.isLoading}
			errorMess={this.props.dishes.errMess}
			comments={this.props.comments.comments.filter( (comment) => comment.dishId === parseInt(match.params.dishId,10))}
			commentsErrMess={this.props.comments.errmess}
			postComment={this.props.postComment}/>
		);
	};
	const AboutComponent = () => {
		return(
			<About
				leaders={this.props.leaders.leaders}
				errorMess = {this.props.leaders.errmess}
				leadersLoading= {this.props.leaders.leadersLoading}
			/>);
	}; 
    return (
		<div>
			<Header/>
			<TransitionGroup>
				<CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
					<Switch>
						<Route path="/home" component={HomeComponent}/> 
						<Route exact path="/contactus" component={() => <Contact 
						postFeedback={this.props.postFeedback}
						resetFeedbackForm={this.props.resetFeedbackForm} />}/> 
						<Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/> 
						<Route path="/menu/:dishId" component={DishWithId} />
						<Route exact path="/about" component={AboutComponent} />
						<Redirect to="/home" />
					</Switch>
				</CSSTransition>
			</TransitionGroup>
			<Footer/>
        </div>
   
    );
  }

  
}





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));