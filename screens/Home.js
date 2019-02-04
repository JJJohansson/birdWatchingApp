import React from 'react';
import { StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import {
  Container, List, ListItem, Text, Body, Right, Button, Header,
  Title, Subtitle, Left, Icon, Content
} from "native-base";

export default class Home extends React.Component {
  static navigationOptions = {title: 'Home',};
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
    };
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
    const { navigate } = this.props.navigation;

    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
      <Container>
        <StatusBar hidden={true} />
        <Header>
          <Body>
            <Title>Bird Watchers</Title>
            <Subtitle>Mark your sightings</Subtitle>
          </Body>
          <Right>
            <Button hasText transparent onPress={() => navigate('Add', { text: "Hello from homepage!" })}>
              <Text>Add</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <List dataArray={this.state.array}
            style={{ marginTop: 25 }}
            renderRow={(bird) =>
              <ListItem>
                <TouchableOpacity
                  style={{ flexDirection: 'row', marginLeft: 5, marginRight: 5 }}
                  underlayColor="white"
                  itemHeader={"asd"}
                >
                  <Left>
                    <Text>{bird.timestamp}</Text>
                  </Left>
                  <Body>
                    <Text note >{bird.species}, {bird.rarity}</Text>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </TouchableOpacity>
              </ListItem>
            }>
          </List>
        </Content>
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
