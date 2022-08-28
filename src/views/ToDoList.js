import React, { Component } from 'react'
import ToDoItem from '../components/ToDoItem';

export default class ToDoList extends Component {
    constructor() {
        super();
        this.state = {
            todoItems: [] //where state exist
        };
    };

    // option1: create a copy, mutate a copy, then use setter function // accepting event here
    // addToList = e => {
    //     e.preventDefault(); //stops on form submission, don't refresh the page
    //     const thingToDo = e.target.thing.value; // gets input from 'name='task'' //could've done 'getDocumentById'
    //     const copy = this.state.todoItems.slice() // copying empty list
    //     //cannot push to the state
    //     // this.state.tasks.push(taskToDo), cannot do this this bc u cannot push to the state, states are immutable
    //     copy.push(thingToDo) //appending/push to that copied list
    //     this.setState({todoItems: copy}) // didn't change state, tasks= [] is being updated, mutating copy by using setter function
    // };

    // option 2: spread operator
    // addToList = e => {
    //     e.preventDefault();
    //     const thingToDo = e.target.thing.value;
    //     const copy = [...this.state.todoItems, thingToDo] //spread of this.state.tasks (copied entire list), add something
    //     this.setState({todoItems: copy})
    // };

    // option3: concatenating
    // addToList function should take in event(e)
    addToList = e => {
        e.preventDefault();
        const thingToDo = e.target.thing.value // thingToDo is the string that's typed in input box (user input)
        const obj = {
            text: thingToDo,
            complete: false
        }
        // appending just the string
        // this.setState({todoItems: this.state.todoItems.concat([thingToDo])})

        // appending object
        this.setState({todoItems: this.state.todoItems.concat([obj])})
    };

    // removing something from an immutable list
    removeFromList = (index) => {
        // copied original state
        const newList = [...this.state.todoItems]
        newList.splice(index, 1) // remove this 1 index, not replacing it with anything
        // don't forget to setState or else it won't show up
        this.setState({todoItems: newList})
    }; 
    
    // a button that changes state if the task is marked complete or not
    // trigger it to change it to true
    markComplete = (newObj, index) => {
        // newList is a copy of todoItems bc we can't mutate the state directly
        const newList = this.state.todoItems.slice()
        newList.splice(index, 1, newObj) //passing in index, what item do u want to delete? deleting 1 thing at that index, what items are u replacing it with? replacing it w/ newObj
        // setState to be that newList
        this.setState({todoItems: newList})
    };

    // showing the state
    showList = () => {
        return this.state.todoItems.map((t, i) => <ToDoItem key={i} obj={t} index={i} markComplete={this.markComplete} removeFromList={this.removeFromList}></ToDoItem>) // maintaining index(we don't want to reorder things, need to make sure which index is being replaced, telling that index the thing exists on)
    }

    render() {
        return (
            <div>
                <form onSubmit={(e)=>{this.addToList(e)}}>
                    <input name='thing'/>
                    <button>Add To List</button>
                </form>

                {this.showList()}

            </div>
        )
    };
};
