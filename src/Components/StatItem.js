import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class StatItem extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.number}</h1>
                <h4>{this.props.text}</h4>
            </div>
        )
    }
}

export default StatItem
