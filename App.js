import React from 'react';
import {
  createAppContainer,
  createStackNavigator
} from 'react-navigation';
import Home from './screens/Home';
import Add from './screens/Add';
import MapScreen from './screens/MapScreen';

const AppNav = createStackNavigator({
  Home: { screen: Home },
  Add: { screen: Add  },
  MapScreen: { screen: MapScreen  }
});

const MyApp = createAppContainer(AppNav);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    }
  }

  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({
      isReady: true
    });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading / > ;
    }
    return <MyApp / >
  }
}