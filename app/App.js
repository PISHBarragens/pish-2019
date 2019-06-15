import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { Routes } from './Routes';
import axios from 'axios';


axios.defaults.headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};
axios.defaults.timeout = 30000;

class App extends Component {
  componentDidMount() {
    this.messageListener = firebase.notifications().onNotification((message) => {
      alert(message.body);
    });
  }
  
  render() {
    return (<Routes />);
  }
}

export default App;
