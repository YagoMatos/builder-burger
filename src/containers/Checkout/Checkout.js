import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }

  componentWillMount(){
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {}
    let price = 0;
    for (let param of query.entries()){
      //console.log(param[1])
      //console.log(param[0])
      // ['salad', '1']
      if (param[0] === 'price'){
        price = param[1]
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    console.log(ingredients)
    this.setState({ingredients: ingredients, totalPrice: price});
  }

  checkoutContinuedHandler = () => {
    this.props.history.push(this.props.match.path + "/contact-data")
  }
  
  checkoutCancelledHandler = () => {
    this.props.history.push("/")
  }

  render(){
    return(
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route 
          path={this.props.match.path + '/contact-data'} 
          render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
      </div>
    )
  }
}

export default Checkout;