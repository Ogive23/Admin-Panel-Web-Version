import './App.css';
import React, { Component } from 'react'
import "react-bootstrap/dist/react-bootstrap.min.js";
import GeneralInfo from './Pages/GeneralInfo';
import { BsHouseDoorFill } from "react-icons/bs";
import './CSS/App.css';
import Navbar from './Components/Navbar';

export class App extends Component {
  constructor(props) {
    super(props);
    // this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {
      // isLoggedIn: false, 
      chosenDashboard: 'General',
    };
  }
  handleChange(event) {
    this.setState({ chosenDashboard: event.target.value });
  }
  // handleLoginClick() {
  //   this.setState({ isLoggedIn: true });
  // }
  // handleLogoutClick() {
  //   this.setState({ isLoggedIn: false });
  // }
  render() {
    // function LoginButton(props) {
    //   return (
    //     <button onClick={props.onClick}>
    //       Login
    //     </button>
    //   );
    // }

    // function LogoutButton(props) {
    //   return (
    //     <button onClick={props.onClick}>
    //       Logout
    //     </button>
    //   );
    // }
    // function Greeting(props) {
    //   const isLoggedIn = props.isLoggedIn;
    //   if (isLoggedIn) {
    //     return <h1>H</h1>;
    //   }
    //   return <h1>G</h1>;
    // }
    // const isLoggedIn = this.state.isLoggedIn;
    // let button;
    // if (isLoggedIn) {
    //   button = <LogoutButton onClick={this.handleLogoutClick} />;
    // } else {
    //   button = <LoginButton onClick={this.handleLoginClick} />;
    // }

    const chosenDashboard = this.state.chosenDashboard;
    let dashboard;
    switch (chosenDashboard) {
      case 'Ahed':
        dashboard = <h1>Ahed</h1>
        break;
      case 'Ataa':
        dashboard = <h1>Ataa</h1>
        break;
      case 'General':
        dashboard = <GeneralInfo />
        break;
      case 'TimeCatcher':
        dashboard = <h1>Time Catcher</h1>
        break;
      case 'MemoryWall':
        dashboard = <h1>Memory Wall</h1>
        break;
      default:
        dashboard = <h1>Error</h1>
        break;
    }
    return (
      <div className="App">
        {/* <Navbar></Navbar> */}
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="General">General</option>
          <option value="Ahed">Ahed</option>
          <option value="Ataa">Ataa</option>
          <option value="TimeCatcher">Time Catcher</option>
          <option value="MemoryWall">Memory Wall</option>
        </select>
        {/* <Greeting isLoggedIn={isLoggedIn} />,
        {button} */}
        {dashboard}
      </div>
    )
  }
}

export default App

