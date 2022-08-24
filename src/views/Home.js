import React, { Component } from 'react'

export default class Home extends Component {
  constructor () {
    super();
    this.state = {'test': 'value'}
    console.log('constructed the HOME component')
  }


  componentDidMount () {
    console.log('mounted the HOME component')
  }

  render() {
    console.log('rendered the HOME component')
    return (
      <>
        <h1 className='hello'>Hello</h1>
          <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>{this.props.ageXYZ}</li>
          </ul>
      </>
    )
  }
}
