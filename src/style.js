import { create } from 'jss'
import preset from 'jss-preset-default'
import createGenerateClassName from 'material-ui/styles/createGenerateClassName'
import { createMuiTheme } from 'material-ui/styles'
import createPalette from 'material-ui/styles/createPalette'
import { red, blue } from 'material-ui/colors'

export function theme() {
  return createMuiTheme({
    palette: createPalette({
      primary: blue,
      accent: red,
      type: 'light',
      overrides: {},
    }),
    nav: {
      height: 64,
    },
    drawer: {
      width: 250,
    },
    chart: {
      billsSavings: chartOptions(),
      savings: {
        responsive: true,
        legend: {
          position: 'left',
          labels: {
            padding: 16,
          }
        },
      },
    },
    solstice: {
      bg: '#1F1F25',
      bgAccent: '#EEEEEE',
    }
  })
}

export function getGlobalStyle(theme) {
	return {
    html: {
      boxSizing: 'border-box',
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    body: {
      background: theme.palette.background.default,
      color: theme.palette.text.primary,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: '1.2',
      margin: 0,
      overflowX: 'hidden',
      WebkitFontSmoothing: 'antialiased', 
      MozOsxFontSmoothing: 'grayscale',
    },
	}
} 

export function getChartBgStyle() {
  return {
    backgroundColor: 'rgba(34, 150, 243, 0.06)',
    border: '1px rgba(102, 153, 204, 0.11) solid', 
  }
}

export function getPrimaryChartStyle() {
  return {
    backgroundColor: 'rgba(102, 153, 204, 0.88)',
    borderColor: 'rgba(102, 153, 204, 0.96)',
    borderWidth: 1,
    hoverBackgroundColor: 'rgba(102, 153, 204, 0.66)',
    hoverBorderColor: 'rgba(102, 153, 204, 0.66)',
  }
}

export function getAccentChartStyle() {
  return {
    backgroundColor: 'rgba(106, 229, 131, 0.66)',
    borderColor: 'rgba(106, 229, 131, 0.96)',
    borderWidth: 1,
    hoverBackgroundColor: 'rgba(106, 229, 131, 0.66)',
    hoverBorderColor: 'rgba(106, 229, 131, 0.66)',
  }
}

function chartOptions() {
  return {
    responsive: true,
    tooltips: {
      bodyFontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      bodyFontSize: 14,
      bodySpacing: 4,
      callbacks: {
        label: function(tooltipItems, {datasets}) { 
          const index = tooltipItems.datasetIndex
          return `${datasets[index].label} - $${tooltipItems.yLabel}`
        }
      },
      displayColors: false,
      mode: 'label',
      titleFontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      titleFontSize: 16,
      titleMarginBottom: 12,
      xPadding: 16,
      yPadding: 16,
    },
    legend: {
      position: 'right',
      // reverse: true,
      labels: {
        boxWidth: 16,
        padding: 24,
      }
    },
    scales: {
      xAxes: [
        {
          barThickness: 44,
          stacked: true,
        }
      ],
      yAxes: [
        {
          stacked: true,
          ticks : {
            callback: (value, index, values) => `$${value}`
          }
        }
      ]
    }
  }
}