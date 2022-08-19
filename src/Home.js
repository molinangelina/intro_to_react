import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
      <>
        <h1 className='hello'>Hello</h1>
          <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>{this.props.age}</li>
          </ul>
      </>
    )
  }
}
