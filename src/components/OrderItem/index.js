import React, { Component } from 'react';
import './style.css';

class OrderItem extends Component {

  constructor(props){
    super(props)
    this.state = {
      editing:false,
      stars:props.data.stars || 0,
      comments:props.data.comments || ''
    }
    console.log(props)
  }

  render() {
    const { shop, product, name, picture, ifCommented } = this.props.data;
    return (
      <div>
        <div className="orderItem">
          <div className="orderItem__picContainer">
            <img className="orderItem__pic" alt="" src={picture} />
          </div>
          <div className="orderItem_content">
            <div className="orderItem__product">{name}</div>
            <div className="orderItem__stop">{shop}</div>
            <div className="orderItem__detail">
              <div className="orderItem__price">{product}</div>
              <div className="orderItem__buttom">
                {
                  ifCommented ? (
                    <div>
                      <button className="orderItem__btn ">已评价</button>
                    </div>
                    
                  ) : (
                    <button className="orderItem__btn orderItem__btn--red"
                      onClick={()=>{this.onReviewHandle()}}>评价</button>
                  )
                }
              </div>
            </div>
          </div>
        </div>
        { this.state.editing ?  this.rederEditArea() : null }
      
      </div>
    );
  }

  // 处理打开评价框
  onReviewHandle = () => {
    this.setState({
      editing:true
    })
  }

  // 处理评价提交按钮事件
  onSubmiteHandle = () => {
    const { id } = this.props.data;
    const { stars, comments } = this.state
    this.setState({
      editing:false
    })
    this.props.onSubmit(id, comments, stars)
  }

  // 处理取消评价按钮事件
  onCancelHandle = () => {
    this.setState({
      editing:false,
      stars:this.props.data.stars || 0,
      comments:this.props.data.comments || ''
    })
  }

  // 处理stars点击评分
  onClickStars = stars => {
    this.setState({
      stars:stars
    })
  }

  // 评论内容保存到state
  onCommentsHandle = e => {
    this.setState({
      comments:e.target.value
    })
  }

  rederEditArea(){
    return (
      <div className="orderItem__commentContainer">
        <textarea onChange={this.onCommentsHandle.bind(this)} 
          value={this.state.comments}
          className="orderItem__comment" />
        {this.renderStars()}
        <button 
          className="orderItem__btn orderItem__btn--red"
          onClick={()=>{this.onSubmiteHandle()}}>提交</button>
        <button onClick={()=>{this.onCancelHandle()}}
          className="orderItem__btn orderItem__btn--grey">取消</button>
      </div>
    )
  }

  renderStars(){
    const { stars } = this.state;
    return (
      <div>
      {[1,2,3,4,5].map((item, index) => {
        {/* 这里不能使用 item => this.onClickStars(item) */}
        return item <= stars ? (
            <span onClick={this.onClickStars.bind(this,item)} key={item} className="orderItem_star--light">★</span>
          ) : (
            <span onClick={this.onClickStars.bind(this,item)} key={item} className="orderItem__stars">★</span>
          )
      })}
      </div>
    )
  }
}

export default OrderItem;