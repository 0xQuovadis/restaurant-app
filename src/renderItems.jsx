import { menuArray } from "./menuArray"
import React from "react"

export function RenderItems(props) {

    
    return(
        <div className="item-container">
            <img src={props.image} alt={props.name}/>
            <div className="item-desc">
            <h2 className="item-name">{props.name}</h2>
            <p className="item-ingredients gray">{props.ingredients.join(', ')}</p>
            <h3 className="item-price">${props.price}</h3>
            </div>
            <i className="fa-solid fa-plus add-btn gray" onClick={props.onClick}></i>
        </div>
        )
}