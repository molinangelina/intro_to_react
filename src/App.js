import React, { Component } from 'react'
import Contact from './Contact'
import Home from './Home'
import Nav from './Nav'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

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
          {this.state.name}
          <button onClick={this.addToAge}>Happy Birthday!</button>

          {/* BLOCK CONTENT */}

          <Routes>
            <Route path='/' element={<Home age={this.state.age} />}/>
            <Route path='/contact' element={<Contact/>}/>
          </Routes>

          {/* BLOCK CONTENT */}
        </div>
      </BrowserRouter>
    )
  }
}
