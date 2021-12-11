import React, { Component } from 'react'

export class StatItem extends Component {
    render() {
        return (
            <div>
                <h1 className='text-white'>{this.props.number}</h1>
                <h4 className='text-white'>{this.props.text}</h4>
            </div>
        )
    }
}

export default StatItem
