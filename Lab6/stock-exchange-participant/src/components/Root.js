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
    setInterval(fetchData, 1000)
  }
  render() {
    const { login, isLoggedIn, logout, isExchangeEnabled } = this.props
    if (!isLoggedIn) {
      return (
        <Router>
          <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            WebkitTransform: "translate(-50%, -50%)",
            transform: "translate(-50%, -50%)"
          }}>
            <div style={{ width:"300px", height:"200px" }}>
              <Login login={login} />
            </div>
          </div>
        </Router>
      )
    }
    return (
      <Router>
        <Menu logout={logout} isExchangeEnabled={isExchangeEnabled} />
        <div className="container-fluid">
          <div className="row mt-5">
            <Switch>
              <Route exact path="/admin">
                <div className="col-10 offset-1">
                  <AdminView />
                </div>
              </Route>
              <Route exact path="/">
                <div className="col-4 offset-1">
                  <BrokerView />
                </div>
                <div className="col-5 offset-1">
                  <StockList />
                </div>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.currentUser !== undefined && state.currentUser != null,
  isExchangeEnabled: state.data.settings.enabledExchange
})

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchData()),
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)