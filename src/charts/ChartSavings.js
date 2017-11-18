import React, {Component} from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { Pie } from 'react-chartjs-2'
import classNames from 'classnames'
import Paper from 'material-ui/Paper'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Check from 'material-ui-icons/Check'
import { withStyles, withTheme } from 'material-ui/styles'
import moment from 'moment'
//
import { getPrimaryChartStyle, getAccentChartStyle, getChartBgStyle } from '../style'
import { normalizeDate } from '../utils'

const styles = (theme, {unit} = theme.spacing) => ({
  root: {
    maxWidth: 660,
    padding: unit * 2,
    position: 'relative',
    width: '80%',
  },
  badge: {
    background: 'rgba(0,0,0,.06)',
    bottom: unit * 4,
    fontSize: 18,
    fontWeight: 300,
    left: '50%',
    padding: `${unit * .5}px ${unit * 2}px`,
    position: 'absolute',
    transform: 'translateX(-50%)',
  },
  chart: {
    width: 'auto',
  },
  chartContainer: {
    padding: `${unit * 2.5}px ${unit * 2}px ${unit * 1.5}px`,
    position: 'relative',
    width: '66%',
    ...getChartBgStyle(),
  },
  container: {
    display: 'flex',
  },
  head: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: unit * 1.5,
    minHeight: 38,
  },
  list: {
    // flex: '0 1 34%', 
    backgroundColor: '#fafafa', 
    border: '1px rgba(102, 153, 204, 0.11) solid',
    minHeight: 331,
    width: '34%',
  },
  listItem: {
    paddingLeft: unit * 2,
  },
})

class ChartSavings extends Component {
  
  state = {
    activeItem: null,
  }

  getChartData = () => {
    const { utilData } = this.props
    const { activeItem } = this.state

    return {
      labels: [
        'Bill',
        'Savings'
      ],
      datasets: [{
        data: this.getDataPoint(activeItem),
        backgroundColor: [
          getPrimaryChartStyle().backgroundColor,
          getAccentChartStyle().backgroundColor,
        ],
        hoverBackgroundColor: [
          getPrimaryChartStyle().backgroundColor,
          getAccentChartStyle().backgroundColor,
        ]
      }]
    }
  }

  getDataPoint = item => [item.bill, item.savings]
  
  setActiveItem = item => this.setState({ activeItem: Object.assign({}, item)})
  
  // Most recent item is the last item.
  getMostRecentItem = (items) => items && items.length && items[items.length - 1]

  componentDidMount = () => {
    const {utilData} = this.props
    // Set the default item... the first.
    if (!this.state.activeItem && utilData.length) this.setActiveItem(this.getMostRecentItem(utilData))
  }

  componentWillReceiveProps = (nextProps) => {
    
    // Do nothing if there's already data in place or there's no data yet
    if (this.state.activeData || !nextProps.utilData.length) return
    
    // Set the default item... the first.
    this.setActiveItem(this.getMostRecentItem(nextProps.utilData))

  }
  
  renderItem = (item, i, items, date = normalizeDate(item)) => (
    <ListItem 
      key={i} 
      button 
      classes={{root: this.props.classes.listItem}} 
      disableGutters 
      divider 
      onClick={() => this.setActiveItem(item)}>
      <ListItemText primary={ moment(date).format('MMMM YYYY') } />
      {
        this.state.activeItem.year === item.year && 
        this.state.activeItem.month === item.month && 
        <ListItemIcon>
          <Check />
        </ListItemIcon>                      
      }
    </ListItem>
  )
  
  render() {

    const { 
      classes: {
        badge, 
        container, 
        chart, 
        chartContainer, 
        head, 
        list, 
        listItem, 
        ...cls
      }, 
      data, 
      theme, 
      utilData 
    } = this.props

    const { activeItem } = this.state

    if (!activeItem) return null
    
    // Show the newest bill first. 
    const items = [].concat(utilData).reverse().map(this.renderItem)

    return (
      <Paper classes={cls}>
        <header className={head}>
          <Typography type="title">How Much Did I Save?</Typography>
        </header>
        <div className={container}>
          <List className={list} disablePadding>
            { items }  
          </List>
          <div className={chartContainer}>
            <div className={chart}>
              <Pie data={this.getChartData()} options={theme.chart.savings} />          
            </div>
            <Typography className={badge} type="subheading" noWrap>
              I saved ${activeItem.savings} in {moment( normalizeDate(activeItem) ).format('MMMM YYYY')}      
            </Typography>
          </div>
        </div>
      </Paper>
    )
  }
}

ChartSavings.defaultProps = {
  utilData: [],
}

ChartSavings.propTypes = {
  classes: PropTypes.object.isRequired,
  utilData: PropTypes.array.isRequired,
}

export default compose(
  withStyles(styles, { name: 'ChartSavings' }),
  withTheme(),
)(ChartSavings)
