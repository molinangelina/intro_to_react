import React, { useState, useEffect } from 'react'
import Contact from './views/Contact'
import Home from './views/Home'
import Nav from './components/Nav'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import News from './views/News'
import IG from './views/IG'
import Login from './views/Login'
import SignUp from './views/SignUp'
import CreatePost from './views/CreatePost'
import ToDoList from './views/ToDoList'
import UpdatePost from './views/UpdatePost'
import SinglePost from './views/SinglePost'
import Shop from './views/Shop'
import SingleProduct from './views/SingleProduct'
import Cart from './views/Cart'

export default function App() {
  // constructor() {
  //   super();
  //   this.state = {
  //     user: {},
  //     cart: []
  //   }
  // }

  // checking local storage to get the key "user"
  // if the key "user" exist, parse through it & convert it back to a dictionary & return it, returning a dictionary full of info
  // otherwise, return a empty dictionary: {}
  const getUserFromLocalStorage = () => {
    const foundUser = localStorage.getItem('padawans94_user')
    if (foundUser) {
      return JSON.parse(foundUser) //parse is reading string & turns it back to a dictionary
    }
    return {} // else return a empty dictionary
  };

  const [user, setUser] = useState(getUserFromLocalStorage()) // useState() is the initial state
  const [cart, setCart] = useState([])

  // logMeIn = (user) => {
  //   this.setState({
  //     user: user
  //   })
  // }

  const logMeIn = (user) => {
    setUser(user) // setting the user
    localStorage.setItem('padawans94_user', JSON.stringify(user))
  }

  const logMeOut = () => {
    console.log('log me out')
    setUser({})
    localStorage.removeItem('padawans94_user') // clearing out local storage so that it actually logs them out
  };

  const addToCart = (product) => {
    setCart([...cart, product]) //creating a copy of that product & then concatenating
  }

  const removeFromCart = (product) => {
    const newCart = [...cart] //newCart is a copy of the original cart
    for (let i = cart.length - 1; i >= 0; i--) { // loop through it, cart.length-1(starting at the end of the list)
      if (product.id == cart[i].id) { // product that u want to remove from cart, new cart is made
        newCart.splice(i, 1) //remove that index, only deleting 1
        break
      }
    }
    setCart(newCart) //new cart
  }

  const getCart = async (user) => {
    if (user.token) {
      const res = await fetch('http://127.0.0.1:5000/api/cart', {
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      console.log(data)
      if (data.status === 'ok') {
        setCart(data.cart)
      }
      else {
        setCart([])
      }
    }
    else {
      setCart([])
    }
  };

  // useEffect can do mounting
  // function that we're going to run and a list of dependencies
  // if anything in list changes, rerun the function
  // to mimick mounting the list must be blank
  // we want to get getCart everytime the user changes 
  useEffect(() => {
    getCart(user)
  }, [user])

  return (
    <BrowserRouter>
      <div>
        <Nav user={user} cart={cart} logMeOut={logMeOut} />

        <Routes>
          <Route path='/' element={<Home ageXYZ={9000} />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/news' element={<News />} />
          <Route path='/feed' element={<IG />} />
          <Route path='/login' element={<Login logMeIn={logMeIn} />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/posts/create' element={<CreatePost user={user} />} />
          <Route path='/posts/update/:postId' element={<UpdatePost user={user} />} />
          <Route path='/posts/:postId' element={<SinglePost user={user} />} />
          <Route path='/todo' element={<ToDoList />} />
          <Route path='/shop' element={<Shop addToCart={addToCart} user={user} />} />
          <Route path='/shop/:productId' element={<SingleProduct />} />
          <Route path='/cart' element={<Cart cart={cart} removeFromCart={removeFromCart} user={user}/>} />
        </Routes>

      </div>
    </BrowserRouter>
  )
}
