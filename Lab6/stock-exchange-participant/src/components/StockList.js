import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { requestBuy } from '../actions'
import { connect } from 'react-redux';

export class StockList extends Component {
    static propTypes = {
        stocks: PropTypes.array.isRequired,
        buy: PropTypes.func
    }
    render() {
        const { stocks, buy } = this.props
        return (
            <div>
                STOCK VIEW
                <table>
                    <thead>
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
                            <tr key={stock.symbol}>
                                <td>{stock.symbol}</td>
                                <td>{stock.name}</td>
                                <td>{stock.max_change}</td>
                                <td>{stock.share_available}</td>
                                <td>{stock.share_price}</td>
                                <td>
                                    <button type="button" onClick={()=>buy(stock.symbol)}>Buy</button>
                                    <span>{stock.isOwned}</span>
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
    let curBroker = state.data.brokers.find(b=>b.name===state.currentUser)
    stocks.forEach(stock=>{
        let isOwned = curBroker.owned.findIndex(s=>s.name===stock.name)!=-1
        stock.isOwned = isOwned
    })
    return { stocks }
}

const mapDispatchToProps = dispatch => {
    return {
        buy: (symbol) => {
            let quantity = parseInt(prompt("Quantity?"))
            dispatch(requestBuy(symbol,quantity))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(StockList)
