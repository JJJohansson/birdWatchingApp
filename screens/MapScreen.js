import React from 'react';
import { MapView, Permissions } from 'expo';

export default class MapScreen extends React.Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      latitude: params.location.latitude,
      longitude: params.location.longitude
    }
  }


  render() {
    const { params } = this.props.navigation.state;
    return (
        <Content>
            <Text>map</Text>
        </Content>
    );
  }
}