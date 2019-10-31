import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { requestBuy, requestSell } from '../actions'
import { connect } from 'react-redux';

export class StockList extends Component {
    static propTypes = {
        stocks: PropTypes.array.isRequired,
        buy: PropTypes.func,
        sell: PropTypes.func
    }
    render() {
        const { stocks, buy, sell } = this.props
        return (
            <div>
                <table className="table">
                    <thead className="thead-dark text-center">
                        <tr>
                            <th>Symbol</th>
                            <th>Name</th>
                            <th>Change</th>
                            <th>Available</th>
                            <th>Price</th>
                            <th>Commands</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.map((stock, i) =>
                            <tr key={stock.symbol} className="text-center">
                                <td>{stock.symbol}</td>
                                <td>{stock.name}</td>
                                <td>{stock.last_change >= 0 ? <strong className="text-success h5">&#8679;&nbsp;</strong> : <strong className="text-danger h5">&#8681;&nbsp;</strong>}
                                    {Math.abs(stock.last_change).toFixed(2) + " %"}</td>
                                <td>{stock.share_available}</td>
                                <td>{stock.share_price.toFixed(2)}</td>
                                <td>
                                    <button type="button" className="btn btn-outline-success mx-3" onClick={() => buy(stock.symbol)}>Buy</button>
                                    <span>{stock.isOwned}</span>
                                    {
                                        stock.isOwned ?
                                            (<button type="button" className="btn btn-outline-info mx-3" onClick={() => sell(stock.symbol)}>Sell</button>)
                                            : ("")
                                    }
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let stocks = [...state.data.stocks]
    let curBroker = state.data.brokers.find(b => b.name === state.currentUser)
    stocks.forEach(stock => {
        if (curBroker.owned) {
            let owned = curBroker.owned.find(s => s.symbol === stock.symbol)
            let quantity = 0;
            if (owned) {
                owned.history.forEach(c => {
                    quantity += c.quantity;
                })
            }
            stock.isOwned = (owned != null && quantity !== 0)
        }else{
            stock.isOwned = false
        }
    })
    return { stocks }
}

const mapDispatchToProps = dispatch => {
    return {
        buy: (symbol) => {
            let quantity = parseInt(prompt("Quantity?"))
            if (!isNaN(quantity))
                dispatch(requestBuy(symbol, quantity))
        },
        sell: (symbol) => {
            let quantity = parseInt(prompt("Quantity?"))
            if (!isNaN(quantity))
                dispatch(requestSell(symbol, quantity))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(StockList)
