import React from 'react';

export default function Product({ product, addToCart }) { // product prop being passed in(accepted) & show that product in browser


    return (
        <div className="card" style={{width: "18rem"}}>
            <img src={product.img_url} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{product.product_name}</h5>
                <p className="card-text">${product.price}</p>
                <p className="card-text">{product.description}</p>
                <button onClick={()=>{addToCart(product)}} className="btn btn-primary">Add to Cart</button>
            </div>
        </div>
    )
}
