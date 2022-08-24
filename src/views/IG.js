import React, { Component } from 'react'
import Post from '../components/Post';

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
        console.log(DataTransferItem)
        // const correctOrder = []
        this.setState({ posts: data.posts })
    }

    showPosts = () => {
        return this.state.posts.map(p => <Post key={p.id} postInfo={p} />)
    }

    render() {
        return (
            <>
                {this.showPosts()}
            </>
        )
    }
}
