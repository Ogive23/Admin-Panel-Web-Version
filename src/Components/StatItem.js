import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Lottie from "lottie-react";
import loading from "./../Assets/animations/loading.json";

export class StatItem extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });

        console.log(this.state.width);
    }
    render() {
        if (this.props.isLoading)
            return (<div className="text-center">
                <div className="text-center mx-auto" style={{ width: this.state.height / 25 }} >
                    <Lottie animationData={loading} />
                </div>
                <h4>{this.props.text}</h4>
            </div>)
        return (
            <div>
                <h1>{this.props.number}</h1>
                <h4>{this.props.text}</h4>
            </div>
        )
    }
}

export default StatItem
