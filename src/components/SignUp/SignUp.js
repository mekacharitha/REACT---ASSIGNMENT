import React, { Component } from 'react';
import Activities from '../Activities/Activities';
import './SignUp.css';
const axios = require('axios');

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            signup: false,
        };
    }

    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })

    }

    onSubmitHandler = () => {
        this.setState({
            signup: true,
        })
        let obj = {
            password: this.state.password,
            activities: {
                //    date : [{
                //         activity: '',
                //         startTime: null,
                //         endTime: null,
                //     }]
            }
        }
        if (!localStorage.getItem(this.state.username)) {
            localStorage.setItem(this.state.username, JSON.stringify(obj))
        }
        localStorage.setItem("signedInUser", this.state.username)

        // axios.post('http://localhost:8000/signup', {
        //     name: this.state.username,
        //     password: this.state.password
        // }).then(function (response) {
        //     console.log(response);
        // })


    }

    onLogoutHandler = () => {
        this.setState({
            username: '',
            password: '',
            signup: false
        })
        localStorage.removeItem("signedInUser")
    }


    render() {

        return (
            <div>
                {this.state.signup ?
                    <div>
                        <button onClick={this.onLogoutHandler} style={{ marginTop: "50px" ,"backgroundColor":"#282c34" ,"color":"white"}}>LOGOUT</button>
                        <Activities
                            username={this.state.username}> </Activities>
                    </div>
                    :
                    <div className="SignUp">
                        <p style={{"fontWeight":"bold" , "fontSize":"large" }}>SIGNUP</p>
                        <input className="Input" type="text" value={this.state.username} placeholder="USERNAME" onChange={this.usernameChangeHandler} />
                        <br />
                        <input className="Input" type="password" value={this.state.password} placeholder="PASSWORD" onChange={this.passwordChangeHandler} />
                        <br />
                        <button onClick={this.onSubmitHandler} className="SignupButton">SIGNUP</button>
                    </div>
                }
            </div>

        )
    }

}

export default SignUp;