import React from 'react'
//
import ChartBillsSavings from '../charts/ChartBillsSavings'
import ChartSavings from '../charts/ChartSavings'

const getRoutes = () => [
  { id: 'home', path: '/', exact: true, label: 'Home', component: ChartBillsSavings },
  { id: 'savings', path: '/savings', label: 'Savings By Month', component: ChartSavings },
]
export default getRoutes