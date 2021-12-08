import React, { Component } from 'react'
import Chart from "react-apexcharts";
import Cookies from 'universal-cookie';
import StatItem from '../Components/StatItem';
import StatChart from '../Components/StatChart';
import { Container, Row, Col } from 'react-bootstrap';


export class GeneralInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            usersChartOptions: null,
            usersChartSeries: null,
            applicationsChartOptions: null,
            applicationsChartSeries: null,
            numberOfActiveUsers: null,
            numberOfWebUsers: null,
            numberOfMobileUsers: null,
            numberOfAhedActiveUsers: null,
            numberOfAtaaActiveUsers: null,
            numberOfTimeCatcherActiveUsers: null,
            numberOfMemoryWallActiveUsers: null,
        };
    }
    componentDidMount() {
        const axios = require('axios').default;
        const cookies = new Cookies();
        cookies.set('accessToken', 'v20H0h0VQ8xxNoarrsGx5CxFJw8kzwN1vlJkftZvSdwcnC5tsjWhEgOcRFK9', { path: '/' });
        console.log(cookies.get('accessToken'));
        axios.get('http://192.168.1.139:8000/api/admin?userId=1',
            {
                headers:
                {
                    'Authorization': 'Bearer ' + cookies.get('accessToken')
                }
            }
        ).then((response) => {
            let data = response.data;
            if (data['Err_Flag']) {
                return this.setState({
                    isLoading: false,
                    error: data['Err_Desc']
                });
            }
            this.setState({
                isLoading: false,
                numberOfActiveUsers: data['data']['General']['NumberOfActiveUsers'],
                numberOfWebUsers: data['data']['General']['NumberOfWebUsers'],
                numberOfMobileUsers: data['data']['General']['NumberOfMobileUsers'],
                numberOfAhedActiveUsers: data['data']['General']['NumberOfAhedActiveUsers'],
                numberOfAtaaActiveUsers: data['data']['General']['NumberOfAtaaActiveUsers'],
                numberOfTimeCatcherActiveUsers: data['data']['General']['NumberOfTimeCatcherActiveUsers'],
                numberOfMemoryWallActiveUsers: data['data']['General']['NumberOfMemoryWallActiveUsers'],
                usersChartSeries: [data['data']['General']['NumberOfWebUsers'], data['data']['General']['NumberOfMobileUsers']],
                usersChartOptions: {
                    chart: {
                        type: 'polarArea',
                    },
                    labels: ['Number of Web Users', 'Number of Mobile Users'],
                    stroke: {
                        colors: ['#fff']
                    },
                    fill: {
                        opacity: 0.8
                    },
                    responsive: [{
                        breakpoint: undefined,
                    }]
                },
                applicationsChartSeries: [
                    data['data']['General']['NumberOfAhedActiveUsers'],
                    data['data']['General']['NumberOfAtaaActiveUsers'],
                    data['data']['General']['NumberOfTimeCatcherActiveUsers'],
                    data['data']['General']['NumberOfMemoryWallActiveUsers'],
                ],
                applicationsChartOptions: {
                    chart: {
                        type: 'polarArea',
                    },
                    labels: ['Number of Ahed Active Users', 'Number of Ataa Active Users', 'Number of Time Catcher Active Users', 'Number of Memory Wall Active Users',],
                    stroke: {
                        colors: ['#fff']
                    },
                    fill: {
                        opacity: 0.8
                    },
                    responsive: [{
                        breakpoint: undefined,
                    }]
                },
            });
        })
            .catch((error) => {
                console.log(error);
                this.setState({
                    isLoading: false,
                    error
                });
            });
    }
    render() {
        const { error, isLoading, items } = this.state;
        console.log(this.state.isLoading);
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        return (
            <Container>
                <Row>
                    <Col xs={6} md={4}><StatItem isLoading={this.state.isLoading} number={this.state.numberOfWebUsers} text={'Number of Web Users'} /></Col>
                    <Col xs={6} md={4}><StatItem isLoading={this.state.isLoading} number={this.state.numberOfActiveUsers} text={'Number of Active Users'} /></Col>
                    <Col xs={6} md={4}><StatItem isLoading={this.state.isLoading} number={this.state.numberOfMobileUsers} text={'Number of Mobile Users'} /></Col>
                </Row>

                <Row>
                    <Col xs={6} md={4}><StatItem isLoading={this.state.isLoading} number={this.state.numberOfAhedActiveUsers} text={'Number of Ahed Active Users'} /></Col>
                    <Col xs={6} md={4}><StatItem isLoading={this.state.isLoading} number={this.state.numberOfAtaaActiveUsers} text={'Number of Ataa Active Users'} /></Col>
                    <Col xs={6} md={4}><StatItem isLoading={this.state.isLoading} number={this.state.numberOfMemoryWallActiveUsers} text={'Number of Memory Wall Active Users'} /></Col>
                    <Col xs={6} md={4}>
                        <StatItem isLoading={this.state.isLoading} number={this.state.numberOfTimeCatcherActiveUsers} text={'Number of Time Catcher Active Users'} /></Col>
                </Row>
                <Row xs={1} md={2}>
                    <Col>
                        <StatChart isLoading={this.state.isLoading} options={this.state.usersChartOptions} series={this.state.usersChartSeries} type="polarArea" />
                    </Col>
                    <Col>
                        <StatChart isLoading={this.state.isLoading} options={this.state.applicationsChartOptions} series={this.state.applicationsChartSeries} type="polarArea" />
                    </Col>
                </Row>

                {/* <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="bar"
                    width="500"
                /> */}
            </Container>
        );
    }
}

export default GeneralInfo
