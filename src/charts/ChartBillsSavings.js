import React, { Component } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { Bar } from 'react-chartjs-2'
import classNames from 'classnames'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Tooltip from 'material-ui/Tooltip'
import { withStyles, withTheme } from 'material-ui/styles'
import BarIcon from 'material-ui-icons/Equalizer'
import LineIcon from 'material-ui-icons/Timeline'
//
import { getPrimaryChartStyle, getAccentChartStyle, getChartBgStyle } from '../style'

const styles = (theme, {unit} = theme.spacing) => ({
  root: {
    maxWidth: 660,
    padding: unit * 2,
    position: 'relative',
    width: '80%',
  },
  active: {},
  btn: {
    minWidth: 16,
    opacity: .24,
    '&$active': {
      backgroundColor: 'rgba(0,0,0,.06)',
      color: 'rgba(102, 153, 204, 0.96)',
      opacity: .48,
    },
  },
  chart: {
    padding: `${unit * 2.5}px ${unit * 2}px ${unit * 1.5}px`,
    width: '100%',
    ...getChartBgStyle(),
  },
  head: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: unit * 1.5,
    minHeight: 38,
  },
})

class ChartBillsSavings extends Component {
  
  state = {
    chartType: 'line',
  }

  constructor(props) {
    super(props)
    this.state = {
      chartType: 'line',
    }
    this.setChartTypeBar = this.setChartType('bar')
    this.setChartTypeLine = this.setChartType('line')

  }

  getChartData = () => {
    const { utilData } = this.props
    const { chartType } = this.state
    return {
      labels: utilData.map(item => `${item.month}/${item.year}`),
      datasets: [
        {
          type: chartType,
          label: 'My Bill',
          data: utilData.map(item => item.bill),
          ...getPrimaryChartStyle(),
        },
        {
          type: chartType,
          label: 'Savings',
          data: utilData.map(item => item.savings),
          ...getAccentChartStyle()
        },
      ]
    }
  }

  setChartType = (type) => () => this.setState({chartType: type})

  render() {
    const { classes: {active, btn, chart, head, ...cls}, theme } = this.props
    const { chartType } = this.state
    return (
      <Paper classes={cls}>
        <header className={head}>
          <Typography type="title">Recent Bills</Typography>
          <nav>
            <Tooltip id="tooltip-bar" title="Bar Chart" placement="top">
              <Button 
                className={classNames(btn, {[active]: chartType === 'bar'})} 
                dense 
                onClick={this.setChartTypeBar}>
                <BarIcon />
              </Button>
            </Tooltip>
            <Tooltip id="tooltip-line" title="Line Chart" placement="top">
              <Button 
                className={classNames(btn, {[active]: chartType === 'line'})} 
                dense 
                onClick={this.setChartTypeLine}>
                <LineIcon />
              </Button>
            </Tooltip>
          </nav>
        </header>
        <div className={chart}>
          <Bar data={this.getChartData()} options={theme.chart.billsSavings} />          
        </div>
      </Paper>
    )
  }
}

ChartBillsSavings.defaultProps = {
  utilData: [],
}

ChartBillsSavings.propTypes = {
  classes: PropTypes.object.isRequired,
  utilData: PropTypes.array.isRequired,
}

export default compose(
  withStyles(styles, { name: 'ChartKwh' }),
  withTheme(),
)(ChartBillsSavings)
