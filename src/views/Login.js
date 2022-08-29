import React, { Component } from 'react'

export default class Login extends Component {

    sendLoginInfo = async (e) => {
        e.preventDefault();

        const url = 'http://localhost:5000/api/login'

        const body = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, //sending json informaton
            body: JSON.stringify(body)
        }

        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data)

        if (data.status === 'ok') {
            this.props.logMeIn(data.data)
        }
    };

    // changing how we process our fetch request but basically doing the same thing instead of using url & options from sendLoginInfo
    // no need for a body, doing it a more secure way
    sendBasicAuth = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/token', {
            method: "POST",
            headers: {Authorization: `Bearer ${btoa(e.target.username.value+":"+e.target.password.value)}`} //base64 encoded handling username & pass, authorizing it
        });
        const data = await res.json();
        console.log(data)
        if (data.status === 'ok') {
            this.props.logMeIn(data.data)
        }

    };

    render() {
        return (
            <form className="col-4" onSubmit={(e) => { this.sendBasicAuth(e) }}>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" className="form-control" name='username' />
                </div>



                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        )
    }
}
