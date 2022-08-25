import React, { Component } from 'react'

export default class SignUp extends Component {

    // async bc we're doing a fetch request, when forms are submitted this function is ran
    // getting back def apiSignMeUp(): input values
    sendSignUpInfo = async (e) => {
        e.preventDefault();

        if (e.target.password.value !== e.target.confirmPassword.value){ // making sure the password AND confirm password match
            return
        }

        // when you're doing an http request you're basically sending a string to the internet & rn we're sending a dictionary
        // JSON is a built in JS package
        // JSON.stringify is turning dict into a stringified version of it (doing this everytime we make a post request)
        // headers as heads up, telling flask btw ima be sending u some content
        const res = await fetch('http://127.0.0.1:5000/api/signup', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                username: e.target.username.value,
                email: e.target.email.value,
                password: e.target.password.value
            })
        });
        const data = await res.json();
        console.log(data)
    };

    render() {
        return (
            //getting that event and running it
            <form className="col-4" onSubmit={(e)=>{this.sendSignUpInfo(e)}}>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" className="form-control" name='username'/>
                </div>


                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="text" className="form-control" name='email'/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name='confirmPassword'/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        )
    }
}
