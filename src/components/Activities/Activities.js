import React, { Component } from 'react';
import './Activities.css';
import Output from '../Output/Output'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';

class Activities extends Component {



    constructor(props) {
        super(props);
        let currentDate = new Date();
        let currentDateEndTime = new Date();
        currentDateEndTime.setHours(23, 59);
        this.state = {
            activity: '',
            startTime: currentDate,
            endTime: currentDateEndTime,
            dateList: [],
            activityDate: new Date(),
            displayActivities: false,
        }
    }


    inputChangeHandler = (event) => {
        this.setState({
            activity: event.target.value,
        })
    }

    onEndTimeChange = (event) => {
        this.setState({
            endTime: event.target.value
        })
    }

    onStartTimeChange = (event) => {
        this.setState({
            startTime: event.target.value
        })
    }

    dateChangeHandler = date => {
        this.setState({
            activityDate: date
        })
    }

    onAddActivityHandler = () => {

        this.setState({
            displayActivities: true
        })
        let localStorageData = null;
        let item = {
            activity: this.state.activity,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
        }


        localStorageData = JSON.parse(localStorage.getItem(this.props.username));

        let currDate = `${this.state.activityDate.getDate()}/${this.state.activityDate.getMonth()}/${this.state.activityDate.getFullYear()}`
        let dateExists = false;

        if (localStorageData.activities != null) {
            let dates = Object.keys(localStorageData.activities)
            dateExists = dates.includes(currDate);
            console.log(dateExists);
        }
        if (dateExists) {
            localStorageData.activities[currDate].push(item)
            localStorage.setItem(this.props.username, JSON.stringify(localStorageData))

        }
        else {
            localStorageData.activities = {
                ...localStorageData.activities,
                [currDate]: [item]
            };
            localStorage.setItem(this.props.username, JSON.stringify(localStorageData))

        }
    }

    onShowActivitiesHandler = () => {
        this.setState({
            displayActivities: !this.state.displayActivities
        })
    }

    render() {

        return (
            <div className="Activities">

                <div className="InputActivityDiv">

                    <input className="InputActivity"
                        type="text"
                        placeholder="Add your Activity"
                        value={this.state.activity}
                        onChange={(event) => this.inputChangeHandler(event)} />

                    <div className="InputTime">
                        <label style={{ fontWeight: "bold" }}>Date  : </label>
                        <DatePicker
                            dateFormat='dd-MM-yyyy'
                            selected={this.state.activityDate}
                            onChange={this.dateChangeHandler}
                            value={this.state.activityDate}
                        />
                    </div>

                    <div className="InputTime">
                        <label style={{ fontWeight: "bold" }}>Start Time  : </label>
                        <TimePickerComponent
                            format={'HH:mm'}
                            onChange={this.onStartTimeChange}
                            value={this.state.startTime}
                        />
                    </div>

                    <div className="InputTime">
                        <label style={{ fontWeight: "bold" }}>End Time  : </label>
                        <TimePickerComponent
                            format={'HH:mm'}
                            onChange={this.onEndTimeChange}
                            value={this.state.endTime}
                        />
                    </div>

                    <button className="Button"
                        onClick={() => this.onAddActivityHandler()}>Add Activity</button>
                </div>

                <div>
                    <button className="ShowButton"
                        onClick={() => this.onShowActivitiesHandler()}>{! this.state.displayActivities ? 'Show Activities' : 'Close Activities'}</button>
                </div>

                <div className="outputContent">
                    {this.state.displayActivities ?
                        <Output username={this.props.username} />
                        : null}
                </div>

            </div>
        )
    }
}

export default Activities;