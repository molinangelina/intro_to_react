import React, { useState } from 'react'
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

export default function App() {
  // constructor() {
  //   super();
  //   this.state = {
  //     user: {},
  //     cart: []
  //   }
  // }

  const [user, setUser] = useState({})
  const [cart, setCart] = useState([])

  // logMeIn = (user) => {
  //   this.setState({
  //     user: user
  //   })
  // }

  const logMeIn = (user) => {
    setUser(user)
  }

  const addToCart = (product) => {
    setCart([...cart, product]) //creating a copy of that product & then concatenating
  }


  return (
    <BrowserRouter>
      <div>
        <Nav cart={cart}/>

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
          <Route path='/shop' element={<Shop addToCart={addToCart} />} />
          <Route path='/shop/:productId' element={<SingleProduct />} />
        </Routes>

      </div>
    </BrowserRouter>
  )
}
