import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import RoutesWrap from './routes/Routes'

import { Provider } from 'react-redux'
import { Store } from 'redux'
import configureStore from './reducers/Store'
import { IApplicationState } from './reducers/Store'

interface IProps {
  store: Store<IApplicationState>
}

const store = configureStore()

const Root: React.SFC<IProps> = (props) => {
  return (
    <Provider store={props.store}>
      <RoutesWrap />
    </Provider>
  )
}

ReactDOM.render(<Root store={store} />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
