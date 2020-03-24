import React, { Component } from 'react';
import "./Report.css";
import moment from 'moment';

class Report extends Component {
    render() {
        let outputData = JSON.parse(localStorage.getItem(this.props.username))
        let keys = Object.keys(outputData.activities)
        let dates = keys.filter(isPast)
        // console.log(dates)

        function isPast(value) {

            var today = value
            today = new Date(today.split('/')[2], today.split('/')[1] - 1, today.split('/')[0]);
            var date2 = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
            date2 = new Date(date2.split('/')[2], date2.split('/')[1], date2.split('/')[0]);
            var timeDiff = Math.abs(date2.getTime() - today.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

            return diffDays < 7

        }

        let prevDates = [];
        for (let i = 0; i < 7; i++) {
            let date = new Date();
            let prevdate = date.getDate() - i;
            date.setDate(prevdate)
            let nowDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            prevDates.push(nowDate)
        }
        //  console.log(prevDates);
        let index = 0, count = 0;
        return (
            <div className='Report'>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous" />
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous" />
                <link rel="stylesheet" type="text/css" href="styles.css" />
                <div className="Header"> REPORT OF ACTIVITIES FOR PAST 7 DAYS
                </div>
                <div className="TableDiv">
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Date</th>
                                <th scope="col">Count of Activities</th>
                                <th scope="col">Total Duration</th>
                            </tr>
                        </thead>

                        {prevDates.map(date => {
                            if (dates.includes(date)) {
                                // count = outputData.activities[date].length;
                                let duration = 0;
                                let durDisplay
                                outputData.activities[date].map((obj) => {
                                    if (obj.endTime !== "") {
                                        count++;
                                        duration = duration + (Math.floor((moment(obj.endTime).diff(moment(obj.startTime))) / 60000))
                                        durDisplay = `${Math.floor((duration / 60))} Hrs ${(duration % 60)} mins`;
                                    }
                                })
                                // console.log(`count of activities for ${date} is ${count} and duration is ${duration}`);
                                index++;
                                return (
                                    <tbody>
                                        <tr>
                                            <td scope="row">{index}</td>
                                            <td>{date}</td>
                                            <td> {count}</td>
                                            <td>{durDisplay}</td>
                                        </tr>
                                    </tbody>
                                )
                            }
                            else {
                                index++
                                return (
                                    <tbody>
                                        <tr>
                                            <td scope="row">{index}</td>
                                            <td>{date}</td>
                                            <td> 0 </td>
                                            <td>{"-"}</td>
                                        </tr>
                                    </tbody>
                                )
                            }
                        })}

                    </table>
                </div>
            </div >
        )
    }
}

export default Report;





