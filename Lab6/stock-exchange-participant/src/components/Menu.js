import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { requestBuy } from '../actions'
import { connect } from 'react-redux';

export class Menu extends Component {
    static propTypes = {
        logout: PropTypes.func
    }
    render() {
        const { logout } = this.props
        return (
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/admin">Admin</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <button onClick={() => logout()}>Log out</button>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default connect()(Menu)