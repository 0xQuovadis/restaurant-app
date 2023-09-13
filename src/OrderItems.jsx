import React from "react"

export function OrderItems(props) {

    const hiddenClass = props.qty ? '' : "hidden"



    return(
        <div className={`order-item-line ${hiddenClass}`}>
            <h2 className="order-item-txt">{props.qty} {props.name}</h2>
            <button className="delete-order-item-btn" onClick={props.onClick}>remove</button>
            <h2 className="order-item-price">{props.qty * props.price}$</h2>
        </div>
    )
}