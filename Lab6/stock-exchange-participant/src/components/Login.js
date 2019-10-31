import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import {Form} from 'react-bootstrap'

export class Login extends Component {
    static propTypes = {
        login: PropTypes.func,
        userId: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = { userId: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        switch (event.target.id) {
            case 'txtId':
                this.setState({ ...this.state, userId: event.target.value });
                break;
            default:
                break;
        }
    }
    render() {
        const { login } = this.props
        return (
            <div>
                <h1 className="float-none">Login</h1>
                <Form.Group controlId="txtId">
                    <Form.Label>Your name</Form.Label>
                    <Form.Control type="text" value={this.state.userId} onChange={this.handleChange} />
                </Form.Group>
                <Link className="btn btn-primary float-right" to="/" onClick={() => {
                    login(this.state.userId)
                }
                }>Login</Link>
            </div>
        )
    }
}

// const mapStateToProps = (state) => ({
//     isLoggedIn: state.currentUser!=undefined && state.currentUser!=null
// })

// const mapDispatchToProps = dispatch => {
//     return {
//         login: () => dispatch(login("broker1"))
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Login)
export default connect()(Login)
