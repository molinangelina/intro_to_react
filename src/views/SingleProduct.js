import React, { useState, useEffect } from 'react'
import Product from '../components/Product';
import { useParams, Link } from 'react-router-dom';

export default function SingleProduct({ user }) {
    const { productId } = useParams()
    const [product, setProduct] = useState({})

    const getSingleProduct = async () => {
        const res = await fetch(`http://localhost:5000/api/products2/${productId}`);
        const data = await res.json();
        if (data.status === 'ok') {
            setProduct(data.product)
        }
    };

    // treating it like a mount
    useEffect(() => {
        getSingleProduct()
    }, [])

    return (
        <div>
            <Product product = {product}/>
        </div>
    )
}
