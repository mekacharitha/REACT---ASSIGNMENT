import React, { Component } from 'react';
import moment from 'moment';
//import Modal from 'react-modal';
import './Output.css';

class Report extends Component {
    render() {
        let c = 0;
        let outputData = JSON.parse(localStorage.getItem(this.props.username))
        let dates = Object.keys(outputData.activities)
        let bool = dates.includes(this.props.date)
        //console.log(this.props.date);
        if (bool) {
            return outputData.activities[this.props.date].map((obj) => {
                c++
                return (
                    <tbody>
                        <tr>
                            <td scope="row">{c}</td>
                            <td>{obj.activity}</td>
                            <td> {moment.utc(obj.startTime).format('HH:mm')}</td>
                            <td>{moment.utc(obj.endTime).format('HH:mm')}</td>
                            <td>{Math.abs(moment(obj.endTime).diff(moment(obj.startTime))) / 60000} minutes</td>

                        </tr>
                    </tbody>
                )
            })
        }
        else {
            return (<tbody><tr><td colSpan="5" ><h1>No activities found on this date </h1></td></tr></tbody>)
        }

    }
}

export default Report;
