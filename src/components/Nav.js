import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends Component {

  // loop through the cart get the price and add it up
  getSubTotal = () => {
    let total = 0 // adding to it(+=), redefine it, so it has to be "let"
    for (let item of this.props.cart) { // for item in that cart
      total += parseFloat(item.price) //adding to total, counter(total +=), add to what? "item.price", making sure it's a floating point number(parseFloat()), toFixed(fix it to two decimal places)
    }
    return total.toFixed(2) // show the total
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/news">News</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/feed">Finstagram</Link>
              </li>

              {this.props.user.username ?
                <>
                  <li className="nav-item">
                    <p className="nav-link">Hello, {this.props.user.username}</p>
                  </li>
                  <li className="nav-item" onClick={this.props.logMeOut}>
                    <Link className="nav-link" to="/login">Log Out</Link>
                  </li>
                </>
                :
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/posts/create">Create Post</Link>
                  </li>
                </>
              }

              <li className="nav-item">
                <Link className="nav-link" to="/todo">To Do List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shop">Shop</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">{this.props.cart.length} | {this.getSubTotal()}</Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    )
  }
}
