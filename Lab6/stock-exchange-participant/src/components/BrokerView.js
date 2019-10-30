import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class BrokerView extends Component {
    static propTypes = {
        cash_reserve: PropTypes.number,
        balance: PropTypes.number,
        owned: PropTypes.array
    }

    render() {
        const { cash_reserve, balance, owned } = this.props;
        return (
            <div>
                BROKER VIEW
                <p>Total funds: {cash_reserve} </p>
                <p>Current balance: {balance} </p>
                <table>
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Quantity</th>
                            <th>Total cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {owned.map((prop, i) =>
                            <tr key={prop.symbol}>
                                <td>{prop.symbol}</td>
                                <td>{prop.quantity}</td>
                                <td>{prop.sum}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let broker = state.data.brokers.find(b => b.name == state.currentUser)
    let { cash_reserve, balance } = broker;
    let owned = JSON.parse(JSON.stringify(broker.owned));
    owned.forEach(stock => {
        let sum = 0;
        let quantity = 0;
        stock.history.forEach(c => {
            sum += c.bought_price;
            quantity += c.quantity;
        })
        stock.sum = sum;
        stock.quantity = quantity;
    });
    // calculate income and include in
    return {
        cash_reserve, balance, owned
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(BrokerView)
