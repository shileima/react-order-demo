import React, { Component } from 'react';
import OrderItem from '../OrderItem';
import Header from '../Header';

class OrderList extends Component {

  constructor(props){
    super(props)
    this.state = {data:[]}
  }

  componentDidMount(){
    fetch('/mock/order.json').then(res => {
      if(res.ok){
        res.json().then(data => {
          this.setState({
            data: data
          })
        })
      }
    })
  }
  
  render() {
    
    return (
      <div>
        <Header />
        {
          this.state.data.map((item, index) => (
            <OrderItem data={item} onSubmit={this.handleSubmit} key={index} />
          ))
        }
      </div>
    ); 
  }

  handleSubmit = (id, comments, stars) => {
    const newData = this.state.data.map(item => {
      return id === item.id ? 
      {
        ...item,
        comments,
        stars,
        ifCommented: true
      } : item;
    });
    this.setState({
      data:newData
    })
  }
}

export default OrderList;