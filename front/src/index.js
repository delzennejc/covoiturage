import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'
import App from './containers/App.container'
import './index.css'

import registerServiceWorker from './registerServiceWorker'

const enhancers = []
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk),
    ...enhancers
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
