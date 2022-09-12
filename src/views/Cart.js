import React from 'react'

export default function Cart({ cart, removeFromCart, user }) {

    // eliminating duplicate items in cart
    const getUniqueCart = (cart) => {
        let uniqueCart = [];
        let ids = new Set(); //filtering ids "have i seen this id b4?"
        for (let item of cart) {
            if (!ids.has(item.id)) { // if it does not have it the id (never seen this before)
                uniqueCart.push(item) // lets go ahead and append it (push it), added item to cart
                ids.add(item.id) // add item.id to Set()
            }
        }
        return uniqueCart
    };
    // updating quantity value
    const getQuantity = (searchItem, cart) => {
        let count = 0;
        for (let item of cart) { // looping through cart & grabbing every item
            if (item.id == searchItem.id) { // looking at the same id
                count++; //incrementing just by 1
            }
        }
        return count
    };

    const getTotal = () => {
        const unique = getUniqueCart(cart) // we have unique cart
        let total = 0;
        for (let item of unique){ // looping through all items in cart
            total += getQuantity(item, cart) * item.price // getting the quantity * price & adding it to total
        }
        return total.toFixed(2)
    }

    const removeFromCartAPI = async (product) => {
        const res = await fetch('http://127.0.0.1:5000/api/cart/remove', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({productId: product.id}) // product.id is what being removed
        });
        const data = await res.json();
        console.log(data)
    };

    const handleClick = (product) => {
        removeFromCart(product);
        if (user.token) {
            removeFromCartAPI(product)
        }
    };


    return cart.length === 0 ?
        (<h1>Your cart is empty</h1>)
        :
        (
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col"></th>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Subtotal</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody>

                    {/* grabbing one item and generating a row for each of them*/}
                    {getUniqueCart(cart).map(item => ( // returning the actual uniqueCart
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td><img style={{ width: '45px' }} src={item.img_url} /></td>
                            <td>{item.product_name}</td>
                            <td>{getQuantity(item, cart)}</td>
                            <td>${item.price}</td>
                            <td>${(getQuantity(item, cart) * item.price).toFixed(2)}</td>
                            <td><button className="btn btn-danger" onClick={() => { handleClick(item) }}>Remove</button></td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="col">Total</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col">${getTotal()}</th>
                        <th scope="col"><button className='btn btn-success' >Checkout</button></th>
                    </tr>
                </tfoot>
            </table>
        )
}
