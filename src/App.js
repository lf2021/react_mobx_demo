import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import store from './mobx/store'
import Home from './pages/home'

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Home/>
        </Provider>
      </div>
    )
  }
}

