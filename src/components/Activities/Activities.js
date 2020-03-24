import React, { Component } from 'react';
import './Activities.css';
import Output from '../Output/Output'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

//import {NotificationContainer, NotificationManager} from 'react-notifications';

class Activities extends Component {



    constructor(props) {
        super(props);
        let currentDate = new Date();
        let currentDateEndTime = new Date();
        currentDateEndTime.setHours(23, 59);
        this.state = {
            activity: '',
            startTime: currentDate,
            endTime: "",
            dateList: [],
            activityDate: new Date(),
            present: new Date(),
            display: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
            displayActivities: true,
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

        if (this.state.activity !== '') {
            NotificationManager.success('Activity added successfully');
        }
        else {
            NotificationManager.error('No Activity Title added', "", 2000);
            return;
        }
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

        let currDate = `${this.state.activityDate.getDate()}/${this.state.activityDate.getMonth() + 1}/${this.state.activityDate.getFullYear()}`
        let dateExists = false;

        if (localStorageData.activities != null) {
            let dates = Object.keys(localStorageData.activities)
            dateExists = dates.includes(currDate);
            //console.log(Object.keys(localStorageData.activities).length);
            // let lenActivities = Object.keys(localStorageData.activities).length;
            // console.log(localStorageData.activities[dates[0]]);
            // if (lenActivities === 7) {
            //     delete localStorageData.activities[dates[0]]
            // }
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

    handlePrevious = () => {
        let date = this.state.present;
        date.setDate(date.getDate() - 1)
        this.setState({ present: date })
        let currDate = `${this.state.present.getDate()}/${this.state.present.getMonth() + 1}/${this.state.present.getFullYear()}`
        // console.log(currDate)
        this.setState({ display: currDate })
    }
    handlePresent = (date) => {
        let xyz = this.state.present;
        xyz.setDate(date.getDate());
        this.setState({ present: xyz })

        let currDate = `${this.state.present.getDate()}/${this.state.present.getMonth() + 1}/${this.state.present.getFullYear()}`
        this.setState({ display: currDate })
    }
    handleNext = () => {
        let date = this.state.present;
        date.setDate(date.getDate() + 1)
        this.setState({ present: date })
        let currDate = `${this.state.present.getDate()}/${this.state.present.getMonth() + 1}/${this.state.present.getFullYear()}`
        // console.log(currDate)
        this.setState({ display: currDate })
    }

    onShowActivitiesHandler = () => {
        this.setState({
            displayActivities: !this.state.displayActivities
        })
    }

    render() {

        return (
            <div className="Activities">
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous" />
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous" />
                <link rel="stylesheet" type="text/css" href="styles.css" />
                <NotificationContainer />
                <div className="InputActivityDiv">

                    <input className="InputActivity"
                        type="text"
                        placeholder="Add your Activity"
                        value={this.state.activity}
                        onChange={(event) => this.inputChangeHandler(event)} />

                    <div className="InputTime">
                        <label style={{ fontWeight: "bold", marginRight: "2px" }}>Date  : </label>
                        <DatePicker
                            dateFormat='dd-MM-yyyy'
                            selected={this.state.activityDate}
                            onChange={this.dateChangeHandler}
                            value={this.state.activityDate}
                        />
                    </div>

                    <div className="InputTime">
                        <label style={{ fontWeight: "bold", marginRight: "2px" }}>Start Time  : </label>
                        <TimePickerComponent
                            format={'HH:mm'}
                            onChange={this.onStartTimeChange}
                            value={this.state.startTime}
                        />
                    </div>

                    <div className="InputTime">
                        <label style={{ fontWeight: "bold", marginRight: "2px" }}>End Time  : </label>
                        <TimePickerComponent
                            format={'HH:mm'}
                            onChange={this.onEndTimeChange}
                            value={this.state.endTime}
                        />
                    </div>

                    <button className="Button"
                        onClick={() => this.onAddActivityHandler()}>Add Activity</button>
                </div>

                {/* <div>
                    <button className="ShowButton"
                        onClick={() => this.onShowActivitiesHandler()}>{!this.state.displayActivities ? 'Show Activities' : 'Close Activities'}</button>
                </div> */}

                <div className='container'>
                    <div class="table-wrapper-scroll-y my-custom-scrollbar">
                        {this.state.displayActivities ?
                            <table className="table table-bordered">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col" align="left">
                                            <button class="btn float-left login_btn" onClick={this.handlePrevious}>Previous</button>
                                        </th>
                                        <th colSpan='3' scope="col" align="center" >
                                            <div style={{ textAlign: "center" }}>
                                                <DatePicker className="form-control" placeholder="date" onChange={this.handlePresent} selected={this.state.present} value={this.state.present} />
                                            </div>
                                        </th>
                                        <th scope="col" align="right">
                                            <button class="btn float-right login_btn" onClick={this.handleNext}>Next</button>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Start Time</th>
                                        <th scope="col">End Time</th>
                                        <th scope="col">Duration</th>
                                    </tr>
                                </thead>


                                <Output date={this.state.display} username={this.props.username}></Output>

                            </table>

                            : null
                        }
                    </div >
                </div>
            </div>
        )
    }
}

export default Activities;























