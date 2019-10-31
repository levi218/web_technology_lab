import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setExchangeStatus } from '../actions'
export class AdminView extends Component {
    static propTypes = {
        brokers: PropTypes.array,
        setExchangeStatus: PropTypes.func
    }

    renderPropList(broker) {
        if (broker.owned) {
            return (
                <table className="table table-bordered">
                    <thead>
                        <tr className="bg-secondary text-white">
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
        const { brokers, setExchangeStatus, isExchangeEnabled } = this.props
        return (
            <div>
                {isExchangeEnabled ?
                    <button className="btn btn-danger mb-5 mx-5" type="button" onClick={() => setExchangeStatus(false)}>Stop session</button>
                    : <button className="btn btn-success mb-5 mx-5" type="button" onClick={() => setExchangeStatus(true)}>Start session</button>
                }
                <table className="table text-center">
                    <thead className="thead-dark">
                        <tr className="table-dark">
                            <th style={{ width: "15%" }}>Name</th>
                            <th style={{ width: "10%" }}>Total funds</th>
                            <th style={{ width: "10%" }}>Current balance</th>
                            <th style={{ width: "10%" }}>Estimated worth</th>
                            <th style={{ width: "10%" }}>Estimated total</th>
                            <th>Properties</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brokers.map((broker, i) =>
                            <tr key={broker.name}>
                                <td>{broker.name}</td>
                                <td>{broker.cash_reserve.toFixed(2)}</td>
                                <td>{broker.balance.toFixed(2)}</td>
                                <td>{broker.estimate_worth.toFixed(2)}</td>
                                <td>{(broker.balance + broker.estimate_worth).toFixed(2)}</td>
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
    let brokers = [...state.data.brokers];
    brokers.forEach(broker => {
        if(!broker.balance) broker.balance = broker.cash_reserve
        let estimate_worth = 0;
        if (broker.owned) {
            let owned = broker.owned;
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
        }else broker.owned=[]
        broker.estimate_worth = estimate_worth;
    })
    let isExchangeEnabled = state.data.settings.enabledExchange;
    return { brokers, isExchangeEnabled }
}

const mapDispatchToProps = dispatch => {
    return {
        setExchangeStatus: (status) => {
            dispatch(setExchangeStatus(status))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminView)
