import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch, NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Navbar, Button } from 'react-bootstrap'
export class Menu extends Component {
    static propTypes = {
        logout: PropTypes.func,
        isExchangeEnabled: PropTypes.bool
    }
    render() {
        const { logout,isExchangeEnabled } = this.props
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <a className="navbar-brand" href="#">Stock Exchange</a>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink exact to="/" className="nav-link" activeClassName="active">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/admin" className="nav-link" activeClassName="active">Admin</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <span className={"navbar-text mr-5 "+(isExchangeEnabled?"text-success":"text-danger")}>
                            {isExchangeEnabled?"Online":"Offline"}
                        </span>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link" onClick={() => logout()}>Log out</Link>
                        </li>
                    </ul>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default connect()(Menu)