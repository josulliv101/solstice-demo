import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui/styles'
//
import { configureStore } from './redux/createStore'
import App from './App/'
import { theme } from './style'

// Option to pass some initial state from server to redux store
const store = configureStore(window.__initialState__ || {})

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme()}>
      <Router>
        <App />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
 