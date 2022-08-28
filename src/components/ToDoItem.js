import React, { Component } from 'react'

export default class ToDoItem extends Component {

    // we want to change obj, but can't mutate prop, so we gotta copy it then change it from the copy
    handleClick = () => {
        // copying object
        const copy = {...this.props.obj, complete: !this.props.obj.complete} // newobject we want in the state, whatever it is now, set it to not that 
        this.props.markComplete(copy, this.props.index) // pass new object & index
    }

    render() {
        return (
            <div>
                {this.props.obj.text}
                {/* "checked" makes the box automatically checked, but it has nothing to do with the state, but we can change that with conditionals */}
                {/* <input type='checkbox' checked/> */}
                {/* if complete == true then show "checked" if not, then return an empty string */}
                <input type='checkbox' checked={this.props.obj.complete ? 'checked' : ''} />
                <button onClick={() => {this.handleClick()}}>Mark Complete</button>
                {/* we need to know what we're removing, what index we're in */}
                <button onClick={()=>{this.props.removeFromList(this.props.index)}}>x</button>
            </div>
        )
    }
}
