import React, { Component } from 'react';
import { Text } from 'native-base';

export default class Timestamp extends Component {
  constructor(props) {
    super(props);
    let d = new Date();
    this.state = {
      year: d.getFullYear(),
      month: d.getMonth(),
      date: d.getDate(),
      hours: d.getHours(),
      minutes: d.getMinutes(),
     };
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  render() {
    return (
      <Text>{this.state.date}.{this.state.month}.{this.state.year} / {this.state.hours}:{this.state.minutes}</Text>
    );
  }
}