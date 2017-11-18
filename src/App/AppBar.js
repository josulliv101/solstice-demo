import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MuiAppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
    backgroundColor: theme.solstice.bg,
    position: 'relative',
  },
})

class AppBar extends Component {
  render() {
    const { classes: {logo, ...cls} } = this.props
    return (
      <MuiAppBar classes={cls} elevation={0} position="static">
        <Toolbar>
          <Typography type="title" color="inherit">
            solstice demo
          </Typography>
        </Toolbar>
      </MuiAppBar>
    )
  }
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AppBar)