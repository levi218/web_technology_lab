// export const REQUEST_POSTS = 'REQUEST_POSTS'
// export const RECEIVE_POSTS = 'RECEIVE_POSTS'
// export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
// export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export const REQUEST_DATA = 'REQUEST_DATA'
export const RECEIVE_DATA = 'RECEIVE_DATA'
export const REQUEST_BUY = 'REQUEST_BUY'
export const LOGGED_IN = 'LOGGED_IN'
export const LOG_OUT = 'LOG_OUT'
// export const requestBuy = (stock, quantity) => ({
//   type: REQUEST_BUY,
//   stock,
//   quantity: quantity
// })

export const requestData = () => ({
  type: REQUEST_DATA
})

export const receiveData = (json) => ({
  type: RECEIVE_DATA,
  data: json,
  receivedAt: Date.now()
})

export const loggedIn = (id) => ({
  type: LOGGED_IN,
  id: id
})

export const loggedOut = () => ({
  type: LOG_OUT
})

export function login(id) {
  return function (dispatch, getState) {
    console.log(getState().data.brokers.find(b => b.name == id) != null)
    if (getState().data.brokers.find(b => b.name == id) != null)
      return dispatch(loggedIn(id));
    else return null;
  }
}
export function logout() {
  return {
    type: LOG_OUT
  }
}

export function requestBuy(symbol, quantity) {
  return function (dispatch, getState) {
    return fetch(`http://localhost:8888/stocks/buy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ broker: getState().currentUser, symbol: symbol, quantity: quantity }) // body data type must match "Content-Type" header
    }).then(response => response.json())
      .then(response => {
        if (response.status == 0) {
          //success
          // refresh data
          dispatch(fetchData());
        } else {
          //error
          window.alert(response.error)
        }
      });
  }
}

export function requestSell(symbol, quantity) {
  return function (dispatch, getState) {
    return fetch(`http://localhost:8888/stocks/sell`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ broker: getState().currentUser, symbol: symbol, quantity: quantity }) // body data type must match "Content-Type" header
    });
  }
}

export function fetchData() {
  return function (dispatch) {
    dispatch(requestData())
    return fetch(`http://localhost:8888/all`)
      .then(response => response.json())
      .then(json => dispatch(receiveData(json)))
  }
}

// const shouldFetchData = (state) => {
//   const data = state.data
//   if (!data) {
//     return true
//   }
//   if (state.isFetching) {
//     return false
//   }
//   return state.didInvalidate
// }

// export const fetchDataIfNeeded = () => (dispatch, getState) => {
//   if (shouldFetchData(getState())) {
//     return dispatch(fetchData())
//   }
// }
