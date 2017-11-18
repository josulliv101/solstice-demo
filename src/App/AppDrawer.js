import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'
import List, { ListItem, ListItemText } from 'material-ui/List'
//
import getRoutes from '../routes/'


const styles = theme => ({
  headline: {
    fontWeight: 300,
    height: theme.nav.height,
  },
  paper: {
    backgroundColor: theme.solstice.bgAccent,
    position: 'static',
    width: theme.drawer.width,
  }
})

class AppDrawer extends Component {
  
  renderNavItem = ({id, label, path}) => (
    <ListItem button divider
      key={id}
      component={Link}  
      to={path}>
      <ListItemText primary={label} />
    </ListItem>
  )

  render() {
    const { classes: {headline, ...cls} } = this.props
    const navCmps = getRoutes().map(this.renderNavItem)
    return (
      <Drawer
        classes={cls}
        type="permanent"
        open={true}>
        <Button 
          align="center" 
          className={headline} 
          component={Link} 
          to="/" 
          type="title">
          My Dashboard
        </Button>
        <Divider />
        <List>
          { navCmps }
        </List>
      </Drawer>
    )
  }
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AppDrawer)
