import React, { Component } from 'react';
import "./Report.css";
// import moment from 'moment';

class Report extends Component {
    render() {
        let outputData = JSON.parse(localStorage.getItem(this.props.username))
        let keys = Object.keys(outputData.activities)
        let dates = keys.filter(isPast)
        console.log(dates)

        function isPast(value) {

            var today = value
            today = new Date(today.split('/')[2], today.split('/')[1] - 1, today.split('/')[0]);
            var date2 = `${new Date().getDate()}/${new Date().getMonth() }/${new Date().getFullYear()}`
            date2 = new Date(date2.split('/')[2], date2.split('/')[1] , date2.split('/')[0]);
            var timeDiff = Math.abs(date2.getTime() - today.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            
            return diffDays < 7
        
        }

        let prevDates = [];
        // let nowDate = `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`;
        for(let i =20;i<27;i++){
            prevDates.push(`${new Date().getDate() - i}/${new Date().getMonth()+1}/${new Date().getFullYear()}`)
        }
        console.log(prevDates);
        
        return (
            <h1>Report Page</h1>
            

        )

    }
}

export default Report;