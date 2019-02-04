import React from 'react';
import { StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import {
  Container, H2, ListItem, Text, Body, Right, Button, Header,
  Title, Subtitle, Left, Icon, Content, Accordion
} from "native-base";
import DropdownList from '../components/DropdownList.js';

export default class Home extends React.Component {
  static navigationOptions = { header: null };
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
      <Container style={{ backgroundColor: "#FE5F55" }}>
        <StatusBar hidden={true} />
        <Header style={{ backgroundColor: "#4F6367"}}>
          <Body>
            <Title style={{marginLeft: 10}}>Bird_Watcher</Title>
          </Body>
          <Right>
            <Button hasText transparent onPress={() => navigate('Add', { text: "Hello from homepage!" })}>
              <Text>New</Text>
            </Button>
          </Right>
        </Header>
        <Content>{/*
          <List dataArray={this.state.array}
            style={{ marginTop: 25 }}
            renderRow={(bird) =>
              <ListItem>
              <ListItem itemHeader first>
                <Text>{ bird.timestamp }</Text>
              </ListItem>
                <TouchableOpacity
                  style={{ flexDirection: 'row', marginLeft: 5, marginRight: 5 }}
                  underlayColor="white"
                  itemHeader={"asd"}
                >
                  <Left>
                    <Text>{bird.species}</Text>
                  </Left>
                  <Body>
                    <Text>{bird.rarity}</Text>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </TouchableOpacity>
              </ListItem>
            }>
          </List>*/}
          <DropdownList birds={this.state.array} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
  },
});
