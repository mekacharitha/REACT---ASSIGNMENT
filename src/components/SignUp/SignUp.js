import React, { Component } from 'react';
// import Activities from '../Activities/Activities';
import SideBar from '../sidebar/SideBar';
import './SignUp.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
// const axios = require('axios');

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
        
        if(this.state.password !=="" && this.state.username !==""){
            NotificationManager.success('Login Success');
            this.setState({
                signup: true,
            })
        }
        else{
            NotificationManager.error('No username or password', 'Click me!', 3000,);
        }
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
        NotificationManager.success('Logout Success');
    }


    render() {

        return (
            <div>
                <NotificationContainer />
                {this.state.signup ?
                    <div>
                        {/* <button onClick={this.onLogoutHandler} style={{ marginTop: "50px" ,"backgroundColor":"#282c34" ,"color":"white" }}>LOGOUT</button> */}
                        {/* <Activities
                            username={this.state.username}> </Activities> */}
                        <SideBar username={this.state.username} onLogout={this.onLogoutHandler}> </SideBar>

                    </div>
                    :
                    <div className="SignUp">
                        <p style={{"fontWeight":"bold" , "fontSize":"30px" }}>SIGN UP</p>
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