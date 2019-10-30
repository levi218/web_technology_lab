import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../actions'

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
                this.setState({...this.state,  userId: event.target.value });
                break;
        }
    }
    render() {
        const { login } = this.props
        return (
            <div>
                <label for="txtId">ID</label>
                <input type="text" id='txtId' value={this.state.userId} onChange={this.handleChange} />
                <button type="button" onClick={() => {
                    login(this.state.userId)
                }
                }>Login</button>
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
