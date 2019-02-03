import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, List, ListItem, Text, Body, Right, Button, Header, Left, Title } from "native-base";
import { NewSightingButton } from './components/newSighting';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      array: [
        {
          species: "crow",
          timestamp: "03/02/19",
          rarity: "common",
          notes: "especially angry"
        },
        {
          species: "articuno",
          timestamp: "01/01/19",
          rarity: "rare",
          notes: "remember to bring a master ball"
        },
      ],
    }
  }

  // gotta wait for the fonts to load
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
      <Container>
        <Header>
          <Body>
            <Title>Bird Watchers</Title>
          </Body>
          <Right>
            <Button hasText transparent>
              <Text>Add</Text>
            </Button>
          </Right>
        </Header>
        <List dataArray={this.state.array}
          style={{ marginTop: 25 }}
          renderRow={(bird) =>
            <ListItem>
              <TouchableOpacity
                style={{ flexDirection: 'row', marginLeft: 5, marginRight: 5 }}
                underlayColor="white"
              >
                <Body>
                  <Text>{bird.species}</Text>
                  <Text note >{bird.rarity} </Text>
                </Body>
                <Right>
                  <Text note >{bird.timestamp}, {bird.notes}</Text>
                </Right>
              </TouchableOpacity>
            </ListItem>
          }>
        </List>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
