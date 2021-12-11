import React, { Component } from 'react'
import ReactApexChart from 'react-apexcharts';

export class StatChart extends Component {
    render() {
        return (
            <ReactApexChart options={this.props.options} series={this.props.series} type={this.props.type} />
        )
    }
}

export default StatChart
