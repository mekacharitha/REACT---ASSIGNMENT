import React from "react";
import { slide as Menu } from "react-burger-menu";
import {
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Activities from '../Activities/Activities';
import Reports from '../Report/Report';
import './SideBar.css';

class Sidebar extends React.Component {
    render() {
        return (
            <div >
                
                <Menu >
                    <Link to="/activities">Activities</Link>
                    <Link to="/report">Report</Link>
                </Menu>
                
                <label className="HelloUser"><h2>Hello {this.props.username}!!</h2></label>
                 
                <button onClick={this.props.onLogout} style={{ backgroundColor:"white" ,color:"#282c34" }} className="LogoutBtn">LOGOUT</button> 
              
                {/* <h1>Hello {this.props.name}</h1> */}
                <Switch>
                <Route exact path="/">
                        <Activities username={this.props.username}/>
                    </Route>
                    <Route path="/activities">
                        <Activities username={this.props.username}/>
                    </Route>
                    <Route path="/report">
                        <Reports username={this.props.username} />
                    </Route>
                </Switch>
            </div>

        );
    }
};
export default Sidebar