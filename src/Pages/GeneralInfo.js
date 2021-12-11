import React, { Component } from "react";
import Chart from "react-apexcharts";
import Cookies from "universal-cookie";
import StatItem from "../Components/StatItem";
import StatChart from "../Components/StatChart";
import { Container, Row, Col } from "react-bootstrap";
import Lottie from "lottie-react";
import loading from "./../Assets/animations/loading.json";

export class GeneralInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      usersChartOptions: null,
      usersChartSeries: null,
      applicationsChartOptions: null,
      applicationsChartSeries: null,
      numberOfJoinedUsersGroupedByYearOptions: null,
      numberOfJoinedUsersGroupedByYearSeries: null,
      numberOfUsersGroupedByNationalityOptions: null,
      numberOfUsersGroupedByNationalitySeries: null,
      numberOfActiveUsers: null,
      numberOfActiveUsersGroupedByAccessType: null,
      numberOfActiveUsersGroupedByAppType: null,
    };
  }
  componentDidMount() {
    const axios = require("axios").default;
    const cookies = new Cookies();
    cookies.set(
      "accessToken",
      "QAIWgfuD0umt7XIBinn4YpnsUgaWdjHOiHT9E4DV1ZAG8WVhBNvUSQDMuRCL",
      { path: "/" }
    );
    axios
      .get("http://192.168.1.3:8000/api/admin?userId=1", {
        headers: {
          Authorization: "Bearer " + cookies.get("accessToken"),
        },
      })
      .then((response) => {
        let data = response.data;
        if (data["Err_Flag"]) {
          return this.setState({
            isLoading: false,
            error: data["Err_Desc"],
          });
        }
        this.setState({
          isLoading: false,
          numberOfActiveUsers: data["data"]["General"]["NumberOfActiveUsers"],
          numberOfActiveUsersGroupedByAccessType:
            data["data"]["General"]["NumberOfActiveUsersGroupedByAccessType"],
          numberOfActiveUsersGroupedByAppType:
            data["data"]["General"]["NumberOfActiveUsersGroupedByAppType"],
          usersChartSeries: data["data"]["General"][
            "NumberOfActiveUsersGroupedByAccessType"
          ].map((data) => {
            return data.count;
          }),
          usersChartOptions: {
            chart: {
              type: "polarArea",
            },
            labels: data["data"]["General"][
              "NumberOfActiveUsersGroupedByAccessType"
            ].map((data) => {
              return data.accessType;
            }),
            stroke: {
              colors: ["#fff"],
            },
            fill: {
              opacity: 0.8,
            },
            responsive: [
              {
                breakpoint: undefined,
              },
            ],
          },
          applicationsChartSeries: data["data"]["General"][
            "NumberOfActiveUsersGroupedByAppType"
          ].map((data) => {
            return data.count;
          }),
          applicationsChartOptions: {
            chart: {
              type: "polarArea",
            },
            labels: data["data"]["General"][
              "NumberOfActiveUsersGroupedByAppType"
            ].map((data) => {
              return data.appType;
            }),
            stroke: {
              colors: ["#fff"],
            },
            fill: {
              opacity: 0.8,
            },
            responsive: [
              {
                breakpoint: undefined,
              },
            ],
          },
          numberOfJoinedUsersGroupedByYearSeries: [
            {
              data: data["data"]["General"]["NumberOfJoinedUsersByYear"].map(
                (data) => {
                  return data.count;
                }
              ),
            },
          ],
          numberOfJoinedUsersGroupedByYearOptions: {
            chart: {
              height: 350,
              type: "bar",
              events: {
                click: function (chart, w, e) {
                  // console.log(chart, w, e)
                },
              },
            },
            plotOptions: {
              bar: {
                columnWidth: "45%",
                distributed: true,
              },
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              show: false,
            },
            xaxis: {
              categories: data["data"]["General"][
                "NumberOfJoinedUsersByYear"
              ].map((data) => {
                return data.year;
              }),
              labels: {
                data: ["1"],
                style: {
                  fontSize: "12px",
                },
              },

              //  [
              //   {
              //     name: "series-1",
              //     data: [30, 40, 45, 50, 49, 60, 70, 91]
              //   }
              // ]
            },
            labels: data["data"]["General"]["NumberOfJoinedUsersByYear"].map(
              (data) => {
                return data.year;
              }
            ),
          },numberOfUsersGroupedByNationalitySeries: [
            {
              data: data["data"]["General"]["NumberOfUsersGroupedByNationality"].map(
                (data) => {
                  return data.count;
                }
              ),
            },
          ],
          numberOfUsersGroupedByNationalityOptions: {
            chart: {
              height: 350,
              type: "bar",
              events: {
                click: function (chart, w, e) {
                  // console.log(chart, w, e)
                },
              },
            },
            plotOptions: {
              bar: {
                columnWidth: "45%",
                distributed: true,
              },
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              show: false,
            },
            xaxis: {
              categories: data["data"]["General"][
                "NumberOfUsersGroupedByNationality"
              ].map((data) => {
                return data.nationality;
              }),
              labels: {
                data: ["1"],
                style: {
                  fontSize: "12px",
                },
              },

              //  [
              //   {
              //     name: "series-1",
              //     data: [30, 40, 45, 50, 49, 60, 70, 91]
              //   }
              // ]
            },
            labels: data["data"]["General"]["NumberOfUsersGroupedByNationality"].map(
              (data) => {
                return data.nationality;
              }
            ),
          },
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          error,
        });
      });
  }
  render() {
    if (this.state.error) {
      return (
        <div className="text-warning">Error: {this.state.error.message}</div>
      );
    } else if (this.state.isLoading)
      return (
        <div className="text-center mx-auto" style={{ width: "10%" }}>
          <Lottie animationData={loading} />
        </div>
      );
    return (
      <Container>
        <Row>
          <Col xs={6} md={4}>
            <StatItem
              number={this.state.numberOfActiveUsers}
              text={"Number of Active Users"}
            />
          </Col>
          {this.state.numberOfActiveUsersGroupedByAccessType.map((data) => {
            return (
              <Col xs={6} md={4}>
                <StatItem number={data.count} text={data.accessType} />
              </Col>
            );
          })}
        </Row>
        <Row>
          {this.state.numberOfActiveUsersGroupedByAppType.map((data) => {
            return (
              <Col xs={6} md={4}>
                <StatItem number={data.count} text={data.appType} />
              </Col>
            );
          })}
        </Row>
        <Row>
          <Col xs={6} md={6}>
            <StatChart
              options={this.state.usersChartOptions}
              series={this.state.usersChartSeries}
              type="polarArea"
            />
          </Col>
          <Col xs={6} md={6}>
            <StatChart
              options={this.state.applicationsChartOptions}
              series={this.state.applicationsChartSeries}
              type="polarArea"
            />
          </Col>
          <Col xs={6} md={6}>
            <StatChart
              options={this.state.numberOfJoinedUsersGroupedByYearOptions}
              series={this.state.numberOfJoinedUsersGroupedByYearSeries}
              type="bar"
            />
          </Col>
          <Col xs={6} md={6}>
            <StatChart
              options={this.state.numberOfUsersGroupedByNationalityOptions}
              series={this.state.numberOfUsersGroupedByNationalitySeries}
              type="bar"
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default GeneralInfo;
