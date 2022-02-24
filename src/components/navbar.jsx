import React, { Component } from "react";

class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <i className="navbar-logo fas fa-leaf"></i>
                <p className="project-name">Habit Tracker</p>
                <span className="navbar-count">{this.props.totalCount}</span>
            </div>
        )
    }
}

export default Navbar;