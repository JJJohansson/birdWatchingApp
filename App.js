import React from 'react';
import { createAppContainer , createStackNavigator } from 'react-navigation';
import Home from './screens/Home';
import Add from './screens/Add';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const AppNav = createStackNavigator(
  {
    Home: { screen: Home },
    Add: { screen: Add },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName == 'Home') {
          return <Ionicons name='md-home' size={25} color={tintColor} />;
        }
        else if (routeName == 'Add') {
          return <Ionicons name="add" size={25} color={tintColor} />;
        }
      }
    })
  },
);

const MyApp = createAppContainer(AppNav);

export default class App extends React.Component {
  render() {
    return <MyApp />
  }
}

