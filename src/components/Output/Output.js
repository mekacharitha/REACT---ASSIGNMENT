import React, { Component } from 'react';
//import moment from 'moment';
import './Output.css';

class Report extends Component {
    render() {
        let outputData = JSON.parse(localStorage.getItem(this.props.username))
        let dates = Object.keys(outputData.activities)
        // let output = dates.map((date, index) => {
        //     outputData.activities[date].map((object, index) => {
        //         console.log("entered output");

        //         return (
        //             <div className="Output">
        //                 <p>ACTIVITY: {object.activity}</p>
        //                 <p>DURATION: {object.startTime}</p>
        //                 <p>DATE: {object.endTime}</p>
        //             </div>
        //         )
        //     })
        // })
        
        return (
            dates.map((date) => {
                return outputData.activities[date].map((act) => {
                    return(
                        <div className="Output">
                        <div>Date: {date}</div>
                        <div>Activity: {act.activity}</div>
                        <div>Duration: {act.endTime}-{act.startTime}</div>
                        </div>

                    )
                })
            })
        )
    }
}

export default Report;
