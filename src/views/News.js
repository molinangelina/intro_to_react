import React, { Component } from 'react'
import Article from '../components/Article';

export default class News extends Component {
    constructor() {
        super();
        // initial state
        this.state = {
            articles: [],
            done: false
        }
    }

    getNews = async (input) => {
        const res = await fetch(`https://newsapi.org/v2/everything?q=${input}&apiKey=e8684d9b10f14228a2c6e1c7a62af260&pageSize=20`)
        const data = await res.json() //getting the data
        console.log(data)
        this.setState({ articles: data.articles }) // triggers rerender, updates the state
    }

    async componentDidMount() {
        this.getNews('bitcoin')
    }

    // showArticles = () => {
    //     return this.state.articles.map((a) => {
    //         return (
    //             <div className="card" style={{ width: "18rem" }}>
    //                 <img src={a.urlToImage} className="card-img-top" alt="..." />
    //                 <div className="card-body">
    //                     <h5 className="card-title">{a.title}</h5>
    //                     <p>{a.author} - {a.source.name}</p>
    //                     <p className="card-text">{a.description}</p>
    //                     <a href={a.url} className="btn btn-primary">Go somewhere</a>
    //                 </div>
    //             </div>
    //         )
    //     })
    // }

    showArticles = () => { // loop/map over through every dict that exists, a is looking at that entire dict, returning return() for every a that exists, 
        return this.state.articles.map((a, i) => //looping through both the item(article) and the index at the same time
            (
                <Article key={i} articleInfo={a}/> // Article child of News
            )
        )
    }

    //accepting event here
    search = (e) => {
        e.preventDefault(); //stops on form submission, we don't refresh the page
        const input = e.target.search.value; // gets input from 'name='search'' //could've done 'getDocumentById'
        this.getNews(input)
    };

    render() {
        return(
            <div>
                {this.state.done? <p>DONE!</p>: <p>Not done</p>}
                <button onClick={()=>{this.setState({done: true})}}>Mark Complete</button>

                <form onSubmit={this.search}>
                    <input name='search'/>
                    <button>Search</button>
                </form>
                <div className="row">


                    {this.showArticles()}
                </div >
            </div>
        )
    }

}
