import React from "react"
import "./App.css"
import { RenderItems } from "./renderItems.jsx"
import { menuArray } from "./menuArray"
import { OrderItems } from "./OrderItems"
import { nanoid } from "nanoid"

export default function App() {

  const [order, setOrder] = React.useState(getOrderArray())
  const [checkoutVisible, setCheckoutVisible] = React.useState(false)
  const [orderComplete, setOrderComplete] = React.useState(false)
  const [cardDetails, setCardDetails] = React.useState({
    name: '',
    cardNumber: '',
    cvv: '',
  })

  function handleDetailsChange(e){
    setCardDetails(prevCardDetails => ({...prevCardDetails,
    [e.target.id]: e.target.value}))
  }

  function getOrderArray() {
    return menuArray.map(item => {
      return {
        id: nanoid(),
        name: item.name,
        qty: 0,
        price: item.price,
        instructions: '',}})
  }

  function handlePlusClick(name){
    setOrder(prevOrder => prevOrder.map(item => 
      item.name === name ? 
      {...item,
      qty: item.qty + 1} :
      item ))
  }

  function handleRemoveClick(name){
    setOrder(prevOrder => prevOrder.map(item =>
      item.name === name ?
      {...item,
        qty: item.qty - 1} :
      item
      ))
  }

  function handlePayBtnClick() {
    const isInputEmpty = Object.values(cardDetails).some(value => !value)
    if(!isInputEmpty) {
    setCheckoutVisible(false)
    setOrderComplete(true) 
    } else {
      document.getElementById('checkout-text').innerText = 'Please fill all required information.'
      document.getElementById('checkout-text').style.color = 'red'
    }
  }

  const totalPrice = order.reduce((total, current) => total += current.qty * current.price ,0)

  const itemInOrder = order.some(item => item.qty > 0)
  
  const orderElements = order.map(item =>
    <OrderItems
    key={item.id}
    {...item}
    onClick={() => handleRemoveClick(item.name)}
    />)

  const menuElements = menuArray.map(item =>
    <RenderItems
      key={item.id}
      {...item}
      onClick={() => handlePlusClick(item.name)}
    />)

    return(
      <div className="document">
        <div className="page">
          <div className="items-menu">
            {menuElements}
          </div>
          {orderComplete &&
          <div className="order-complete-state">
            <h2 className="order-complete-text">Thanks, {cardDetails.name}! Your order is on its way.</h2>
          </div>
          }
          {itemInOrder && !orderComplete &&
          <div className="pre-checkout-container">
              <h2 className="your-order">Your Order</h2>
              <div className="order-item-container">
                  {orderElements}
              </div>
              <h2 className="total-price">
                  Total price: {totalPrice}$
              </h2>
              <button className="complete-order-btn" onClick={() => setCheckoutVisible(true)}>Complete order</button>
          </div>
          }
        </div>
        {checkoutVisible &&
        <div className="checkout-page">
          <div className="overlay" onClick={() => setCheckoutVisible(false)}></div>
          <div className="checkout-window">
            <h2 className="checkout-text" id="checkout-text">
              Enter card details
            </h2>
            <div className="card-details">
              <input className="card-input" type="text" placeholder="Enter your name" onChange={handleDetailsChange} id="name" value={cardDetails.name}/>
              <input className="card-input" type="text" placeholder="Enter card number" onChange={handleDetailsChange} id="cardNumber" value={cardDetails.cardNumber}/>
              <input className="card-input" type="password" placeholder="Enter CVV" onChange={handleDetailsChange} id="cvv" value={cardDetails.cvv}/>
              <button className="pay-btn" onClick={() => handlePayBtnClick()}>Pay</button>
            </div>
        </div>
        </div>}
      </div>
    )
}