import {
  REQUEST_DATA, RECEIVE_DATA, REQUEST_BUY, LOGGED_IN, LOG_OUT
} from '../actions'

const initialState = {
  isFetching: false,
  didInvalidate: true,
  data: {
    settings: {},
    brokers: [],
    stocks: []
  },
  currentUser: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_DATA: {
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    }
    case RECEIVE_DATA: {
      console.log("received data")
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        data: action.data,
        lastUpdated: action.receivedAt
      };
    }
    case LOGGED_IN: {
      return {
        ...state,
        currentUser: action.id
      }
    }
    case LOG_OUT:
      return {
        ...state,
        currentUser: null
      }
    default:
      return state;
  }
}