import React, { Component } from 'react';
import moment from 'moment';
//import Modal from 'react-modal';
import './Output.css';

class Report extends Component {
    render() {
        let outputData = JSON.parse(localStorage.getItem(this.props.username))
        let dates = Object.keys(outputData.activities)

        return (
            dates.map((date) => {
                return outputData.activities[date].map((act) => {
                    return (
                        <div className="Output">
                            <div>Date: {date}</div>
                            <div>Activity: {act.activity}</div>
                            {/* <div>Duration: {moment.utc(moment(act.endTime, "DD/MM/YYYY HH:mm:ss").diff(moment(act.startTime, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")}</div> */}
                            <div>Duration: {(moment(act.endTime).diff(moment(act.startTime)))} milliseconds</div>
                        </div>

                    )
                })
            })
        )
    }
}

export default Report;

