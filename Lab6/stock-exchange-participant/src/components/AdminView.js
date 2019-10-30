import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class AdminView extends Component {
    static propTypes = {
        brokers: PropTypes.array
    }

    renderPropList(broker) {
        if (broker.owned) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {broker.owned.map((prop, i) =>
                            <tr key={prop.symbol}>
                                <td>{prop.symbol}</td>
                                <td>{prop.quantity}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )
        } else
            return null
    }
    render() {
        const { brokers } = this.props
        return (
            <div>
                ADMIN VIEW
                <button type="button">Start session</button>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Balance</th>
                            <th>Properties</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brokers.map((broker, i) =>
                            <tr key={broker.name}>
                                <td>{broker.name}</td>
                                <td>{broker.cash_reserve}</td>
                                <td>{this.renderPropList(broker)}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { brokers: state.data.brokers }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AdminView)
