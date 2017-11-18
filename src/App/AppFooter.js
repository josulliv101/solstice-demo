import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  link: {
  	fontWeight: 300,
    marginRight: theme.spacing.unit * 1,
    textDecoration: 'none',
  },
})

const links = [
  { name: 'React', url: 'https://reactjs.org/' },
  { name: 'Chart.js', url: 'http://www.chartjs.org' },
  { name: 'Material-UI', url: 'https://material-ui-1dab0.firebaseapp.com/' },
]

class AppFooter extends Component {
  render() {
  	const { classes } = this.props
    const items = links.map(({name, url}) => 
      <a key={name} 
        className={classes.link} 
        target="_blank" 
        href={url}>
        {name}
      </a>)
    return (
      <footer>
        <Typography align="center" color="inherit">
        	{ items }
        </Typography>
      </footer>
    )
  }
}

AppFooter.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AppFooter)
