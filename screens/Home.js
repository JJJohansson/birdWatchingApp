import React from 'react';
import { StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import {
  Container, Text, Body, Right, Button, Header, Title, Content
} from "native-base";
import DropdownList from '../components/DropdownList.js';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('birdwatcher.db');

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
      birds: []
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

  componentDidMount() {
    // create the table if it doesn't exist already
    db.transaction(transaction => {
      transaction.executeSql(
        'create table if not exists sightings (id integer primary key not null, species text not null, rarity text not null, timestamp text not null, latitude text, longitude text, notes text);'
      );
    });
    this.query();
    console.log('table found/created')
  }

  
  query = () => {
    db.transaction(transaction => {
      transaction.executeSql('select * from sightings',
        [],
        (_, { rows: { _array } }) => this.setState({birds: _array}));
    });
  }

  deleteDB = () => {
    db.transaction(transaction => {
      transaction.executeSql(
        'drop table sightings;'
      );
    });
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
            <Button hasText transparent onPress={() => navigate('Add', { birds: this.state.birds })}>
              <Text>New</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <DropdownList birds={this.state.birds} />
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


/*



          <Button block rounded style={{width: 200, backgroundColor: 'gray', margin: 10}} 
          onPress={() => this.deleteDB()}>
            <Text>delete</Text>
          </Button>


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
          </List>*/