import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
//
import getRoutes from './'

const styles = theme => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 8,
    padding: theme.spacing.unit * 3,
  }
})

class MainRoutes extends Component {

  renderRoute = ({component: Component, id, label, to, ...rest}) => (
    <Route {...rest} // Include any extras like exact=true
      key={id} 
      render={props => <Component utilData={this.props.data} {...props} />}
    />  
  )

  render() {
    const { classes } = this.props
    const routeCmps = getRoutes().map(this.renderRoute)
    return (
      <div className={classes.root}>
        <Switch>
          { routeCmps }
        </Switch>
      </div>
    );
  }
};

MainRoutes.defaultsProps = {
  data: [],
}

MainRoutes.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { name: 'MainRoutes' })(MainRoutes)
