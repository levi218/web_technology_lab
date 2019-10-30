import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestSell } from '../actions';

export class BrokerView extends Component {
    static propTypes = {
        cash_reserve: PropTypes.number,
        balance: PropTypes.number,
        owned: PropTypes.array,
        sell: PropTypes.func
    }

    render() {
        const { cash_reserve, balance, owned, sell } = this.props;
        return (
            <div>
                BROKER VIEW
                <p>Total funds: {cash_reserve} </p>
                <p>Current balance: {balance} </p>
                <p>Total income: {balance-cash_reserve} </p>
                <table>
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Owned quantity</th>
                            <th>Total share on market</th>
                            <th>Total cost</th>
                            <th>Total current value</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {owned.map((prop, i) =>
                            <tr key={prop.symbol}>
                                <td>{prop.symbol}</td>
                                <td>{prop.quantity}</td>
                                <td>{prop.total_share}</td>
                                <td>{prop.sum}</td>
                                <td>{prop.value}</td>
                                <td><button onClick={()=>sell(prop.symbol)}>Sell</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let broker = state.data.brokers.find(b => b.name === state.currentUser)
    let { cash_reserve, balance } = broker;
    let owned = JSON.parse(JSON.stringify(broker.owned));
    owned.forEach(stock => {
        let sum = 0;
        let quantity = 0;
        stock.history.forEach(c => {
            sum += c.bought_price;
            quantity += c.quantity;
        })
        let stock_info = state.data.stocks.find(s=>s.symbol===stock.symbol)
        let current_price = stock_info?stock_info.share_price:0
        stock.sum = sum;
        stock.quantity = quantity;
        stock.total_share = stock_info.total_share?stock_info.total_share:stock_info.share_available
        stock.value = current_price*stock.quantity;
    });
    
    return {
        cash_reserve, balance, owned,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        sell: (symbol) => {
            let quantity = parseInt(prompt("Quantity"))
            dispatch(requestSell(symbol,quantity))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrokerView)
