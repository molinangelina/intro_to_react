import React, { Component } from 'react'
import Contact from './views/Contact'
import Home from './views/Home'
import Nav from './components/Nav'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import News from './views/News'
import IG from './views/IG'
import Login from './views/Login'
import SignUp from './views/SignUp'
import CreatePost from './views/CreatePost'

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

  logMeIn = (user ) => {
    this.setState({
      user: user
    })
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
            <Route path='/login' element={<Login logMeIn={this.logMeIn}/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/posts/create' element={<CreatePost user={this.state.user}/>}/>
          </Routes>

          {/* BLOCK CONTENT */}
        </div>
      </BrowserRouter>
    )
  }
}
