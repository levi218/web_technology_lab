import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestSell } from '../actions';

export class BrokerView extends Component {
    static propTypes = {
        cash_reserve: PropTypes.number,
        balance: PropTypes.number,
        owned: PropTypes.array,
        sell: PropTypes.func,
        estimate_worth: PropTypes.number
    }

    render() {
        const { cash_reserve, balance, estimate_worth, owned, sell } = this.props;
        return (
            <div>
                <table className="table">
                    <tbody>
                        <tr>
                            <td>Total funds</td>
                            <td className="text-right">{cash_reserve.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Current balance</td>
                            <td className="text-right">{balance.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Estimated worth of owned stocks</td>
                            <td className="text-right">{estimate_worth.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Estimated total</td>
                            <td className="text-right">{(balance + estimate_worth).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Symbol</th>
                            <th>Owned quantity</th>
                            <th>&sum; Quantity on market</th>
                            <th>&sum; Cost</th>
                            <th>&sum; Current value</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {owned.map((prop, i) =>
                            prop.quantity !== 0 &&
                            <tr key={prop.symbol}>
                                <td>{prop.symbol}</td>
                                <td>{prop.quantity}</td>
                                <td>{prop.total_share}</td>
                                <td>{prop.sum.toFixed(2)}</td>
                                <td>{prop.value.toFixed(2)}</td>
                                <td><button className="btn btn-outline-info mx-3" onClick={() => sell(prop.symbol)}>Sell</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    let broker = state.data.brokers.find(b => b.name === state.currentUser)
    let { cash_reserve } = broker;
    let balance = broker.balance?broker.balance:broker.cash_reserve;
    let estimate_worth = 0;
    let owned = [];
    if (broker.owned) {
        owned = JSON.parse(JSON.stringify(broker.owned));
        owned.forEach(stock => {
            let sum = 0;
            let quantity = 0;
            stock.history.forEach(c => {
                sum += c.bought_price;
                quantity += c.quantity;
            })
            let stock_info = state.data.stocks.find(s => s.symbol === stock.symbol)
            let current_price = stock_info ? stock_info.share_price : 0
            stock.sum = sum;
            stock.quantity = quantity;
            stock.total_share = stock_info.total_share ? stock_info.total_share : stock_info.share_available
            stock.value = current_price * stock.quantity;
            estimate_worth += stock.value
        });
    }
    return {
        cash_reserve, balance, owned, estimate_worth

    }
}

const mapDispatchToProps = dispatch => {
    return {
        sell: (symbol) => {
            let quantity = parseInt(prompt("Quantity"))
            if (!isNaN(quantity))
                dispatch(requestSell(symbol, quantity))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrokerView)
