import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Product from '../components/Product';

export default function Shop({addToCart}) {
    // initial state
const [products, setProducts] = useState([])

const getProducts = async () => {
    const res = await fetch('http://127.0.0.1:5000/api/products2');
    const data = await res.json();
    // console.log(data) this printed out the dictionary of products in console browser
    setProducts(data.products) // updates product variable, triggers rerender
    }

    // when do I want to get products? when i load/mount
    // to mimick mounting: it depends on nothing: you want it to run once and only once
    useEffect(() => { // takes in two things: a function to run and an array of dependencies
        // a function to run
        getProducts()
    }, // an array of dependencies
    [])
    
    // show products in gonna show all the products
    // for every p (product) i want to load 'Product'
    const showProducts = () => {
        // key={p.id} is moved to the <Link> bc the parent should have the unique key
        // product={p} is showing product info 
        return products.map(p =><Product addToCart={addToCart} product={p}/>) // this is the state don't need to say "this.state.products" bc we're not in a class
    }

    return (
    <div>
        Shop
        {showProducts()}
    </div>
    )
}
