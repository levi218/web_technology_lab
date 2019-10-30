import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import StockList from './StockList'
import BrokerView from './BrokerView'
import AdminView from './AdminView'
import Login from './Login'
import Menu from './Menu'

import { connect } from 'react-redux';
import { login, logout, fetchData } from '../actions'

export class Root extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    login: PropTypes.func,
    logout: PropTypes.func,
    isLoggedIn: PropTypes.bool
  }
  componentDidMount() {
    const { fetchData } = this.props
    fetchData()
  }
  render() {
    const { login, isLoggedIn, logout } = this.props
    if (!isLoggedIn) { 
      return (
        <Login login={login} />
      )
    }
    return (
      <Router>
        <Menu logout={logout} />
        <Switch>
          <Route path="/admin">
            <AdminView />
          </Route>
          <Route path="/">
            <BrokerView />
            <StockList />
          </Route>
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.currentUser != undefined && state.currentUser != null
})

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchData()),
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)