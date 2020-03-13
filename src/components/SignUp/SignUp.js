import React, { Component } from 'react';
import Activities from '../Activities/Activities';
import './SignUp.css';

class SignUp extends Component {

    state = {
        username: '',
        password: '',
        // submit:false,
        activities: {
            //    date : [{
            //         activity: '',
            //         startTime: null,
            //         endTime: null,
            //     }]
        }
    };


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

        if (!localStorage.getItem(this.state.username)) {
            localStorage.setItem(this.state.username, JSON.stringify(this.state))
        }
        localStorage.setItem("signedInUser" , this.state.username)
        // this.setState({
        //     submit:true
        // })

    }


    render() {

        return (

            <div className="SignUp">
                {/* <form onSubmit={(e) => {
                    e.preventDefault()
                    this.onSubmitHandler(e)
                }}> */}
                <input className="Input" type="text" value={this.state.username} placeholder="USERNAME" onChange={this.usernameChangeHandler} />
                <br />
                <input className="Input" type="password" value={this.state.password} placeholder="PASSWORD" onChange={this.passwordChangeHandler} />
                <br />
                <button onClick={this.onSubmitHandler} >SIGNUP</button>
                {/* </form> */}

                <Activities
                username={this.state.username}> </Activities>
            </div>


        )
    }

}

export default SignUp;