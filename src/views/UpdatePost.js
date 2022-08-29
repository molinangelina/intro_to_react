import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

export default function UpdatePost({ user }) { // UpdatePost() is react component not a class
    // params: we get back a dictionary of postId value
    // const params = useParams()
    // const postId = params.postId

    // syntax we'll always use, creating state here, initial state is empty dictionary
    // useState always returns the state variable and a function to setState
    const [post, setPost] = useState({})
    // post == the actual state object
    // destructure the object: useParams, saving key 'postId' to the variable {postId}
    const { postId } = useParams()

    const sendUpdates = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:5000/api/posts/update`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', //'application/json' == sending a body of json info(a dictionary)
                "Authorization": `Bearer ${user.token}` //verifying user
            },
            body: JSON.stringify({
                title: e.target.title.value,
                caption: e.target.caption.value,
                imgUrl: e.target.imgUrl.value,
                postId: postId
            })
        });
        const data = await res.json();
        console.log(data)
    }

    //mount
    const getSinglePost = async () => {
        const res = await fetch(`http://localhost:5000/api/posts/${postId}`);
        const data = await res.json(); // wait for response
        // console.log(data) //single post prints out once its done
        // update state: just like "this.setState()"
        // function that will update/override the variable "post", variable is immutable
        if (data.status === 'ok') { // convert it, if its ok we'll update the state
            setPost(data.post)
        }
    };

    // useEffect takes in 2 arguments
    // function to run & an array of dependencies
    // useEffect does not return anything, never need const = 
    // to mimic a componentDidMount, your array should be empty, nothing will always be nothing, it can never change
    useEffect(() => {
        getSinglePost()
    }, [])

    // when the state changes, trigger a rerender
    return (
        <form className="col-4" onSubmit={(e) => { sendUpdates(e) }}>

            <div className="mb-3">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" name='title' defaultValue={post.title}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Caption</label>
                <input type="text" className="form-control" name='caption' defaultValue={post.caption}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input type="text" className="form-control" name='imgUrl' defaultValue={post.img_url}/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}
