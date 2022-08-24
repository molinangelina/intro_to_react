import React, { Component } from 'react'
import Contact from './views/Contact'
import Home from './views/Home'
import Nav from './components/Nav'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import News from './views/News'
import IG from './views/IG'
import Login from './views/Login'
import SignUp from './views/SignUp'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      user: {},
      name: 'Angel',
      age: 22
    }
  }

  addToAge = () => {
    this.setState({age: this.state.age + 1})
  }


  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav />
          {/* {this.state.name}
          <button onClick={this.addToAge}>Happy Birthday!</button> */}

          {/* BLOCK CONTENT */}

          <Routes>
            <Route path='/' element={<Home ageXYZ={this.state.age}/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/news' element={<News/>}/>
            <Route path='/feed' element={<IG posts={this.state.posts}/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<SignUp/>}/>
          </Routes>

          {/* BLOCK CONTENT */}
        </div>
      </BrowserRouter>
    )
  }
}
