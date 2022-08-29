import React, { Component } from 'react'
import Post from '../components/Post';
import { Link } from 'react-router-dom';

export default class IG extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    componentDidMount = async () => {
        this.getPosts()
    }

    getPosts = async () => {
        const res = await fetch('http://127.0.0.1:5000/api/posts');
        const data = await res.json();
        console.log(data)
        // const correctOrder = []
        this.setState({ posts: data.posts })
    }

    showPosts = () => {
        // the ley should be on the outtermost
        return this.state.posts.map(p=><Link key={p.id} to={`/posts/${p.id}`}><Post postInfo={p}/></Link>) //i is not needed bc posts already have unique ids // get every post(p) and return every Post component
    }

    render() {
        return (
            <>
                {this.showPosts()}
            </>
        )
    }
}
