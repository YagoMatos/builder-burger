import React, { Component } from 'react';
import axios from "../../../axios-orders";

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false,
    totalPrice:''
  }

  orderHandler = (event) => {
    event.preventDefault()
    console.log(this.props)
    const { price } = this.props;
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: price,
      customer: {
        name: "Yago",
        address: {
          street: "Testesr 1",
          zipCode: "2344",
          coutry: "Brazil"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };
    axios
    .post("/orders.json", order)
    .then(response => {
      console.log(order)
      this.setState({ loading: false });
      this.props.history.push('/')
    })
    .catch(error => {
      console.log(error);
      this.setState({ loading: false });
    });
  }
  render(){

    let form = (
      <form>
          <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
          <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
          <input className={classes.Input} type="text" name="street" placeholder="Street Address" />
          <input className={classes.Input} type="text" name="postal" placeholder="PostalCode Address" />
          <Button clicked={this.orderHandler} btnType="Success">ORDER</Button>
        </form>
    )

    if (this.state.loading){
      form = <Spinner />
    }

    return(
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
          {form}
      </div>
    )
  }

}

export default ContactData;