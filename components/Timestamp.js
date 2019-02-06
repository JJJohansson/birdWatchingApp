import React, { Component } from 'react';
import { Text } from 'native-base';

export default class Timestamp extends Component {
  constructor(props) {
    super(props);
    let d = new Date();
    this.state = {
      utc: d.toUTCString(),
     };
  }

  render() {
    return (
      <Text>{this.state.utc}</Text>
    );
  }
}