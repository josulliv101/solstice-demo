import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withAsyncWork } from '@josulliv101/connect-async-work'
import { withRouter } from 'react-router'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
//
import { AppBar, AppDrawer, AppFooter } from './'
import MainRoutes from '../routes/MainRoutes'
import { getGlobalStyle } from '../style'
import { sortByDate } from '../utils'
import api from '../api'

const styles = theme => ({
  '@global': getGlobalStyle(theme),
  root: {
    display: 'flex',
    transition: theme.transitions.create(['opacity']),
    '&$loading': {
      opacity: .4,
    },
  },
  content: {
    flex: 1,
  },
  loading: {},
})

class App extends Component {

  render() {
    const { classes, loading = false, utilData } = this.props
    return (
      <div className={classNames(classes.root, {[classes.loading]: loading})}>
        <AppDrawer />
        <div className={classes.content}>
          <AppBar />
          {!loading ? <MainRoutes data={utilData} /> : null}
          <AppFooter />
        </div>
      </div>
    )
  }
}

const work = [{ 
  key: 'utilData', 
  // Put the utility data in redux store sorted by date (ascending)
  work : () => api('/api/mybills').then(bills => bills.sort(sortByDate))
}]

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

// 'withRouter' needed to work around react-router issue with redux store
export default withRouter( 
  compose(
    withStyles(styles),
    withAsyncWork(work)
  )(App)
)
