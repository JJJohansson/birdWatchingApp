import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import {
  Container, Content, Picker, Text, Form, Item, Button, Label,
  Input, Header, Body, Icon, Title
} from "native-base";
import DateComponent from '../components/DatePicker.js';
import Timestamp from '../components/Timestamp.js';
import { Location, Permissions, SQLite } from 'expo';

const db = SQLite.openDatabase('birdwatcher.db');

export default class Add extends React.Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    var d = new Date();
    this.state = {
      isReady: false,
      species: '',
      rarity: 'Common',
      notes: '',
      timestamp: '',
      year: d.getFullYear(),
      month: d.getMonth(),
      date: d.getDate(),
      hours: d.getHours(),
      minutes: d.getMinutes(),
      location: null,
      latitude: null,
      longitude: null,
    };
  }

  // gotta wait for the fonts to load
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    .then(this.getLocation());
    this.setState({ isReady: true });
  }

  getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert('No permission to access location.');
    }
    else {
      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      this.setState({ location, latitude: location.coords.latitude, longitude: location.coords.longitude })
    }
  }

  query = () => {
    db.transaction(transaction => {
      transaction.executeSql('select * from sightings',
        [],
        (_, { rows: { _array } }) => console.log(_array));
    });
  }

  save = () => {
    const { params } = this.props.navigation.state;
    const timestamp = `${this.state.date}.${this.state.month}.${this.state.year} / ${this.state.hours}:${this.state.minutes}`
    console.log(params.birds.length);
    db.transaction(transaction => {
      transaction.executeSql('insert into sightings (id, species, rarity, timestamp, latitude, longitude, notes) values (?, ?, ?, ?, ?, ?, ?)',
      [params.birds.length, this.state.species, this.state.rarity, timestamp, this.state.latitude, this.state.longitude, this.state.notes]);
    }, null, this.query())
  }

  
  onValueChange2(value) {
    this.setState({
      rarity: value
    });
  }

  render() {
    let location = this.state.location ? `${this.state.latitude}, ${this.state.longitude}` : '';

    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
      <Container>
        <Header style={{ backgroundColor: "#4F6367"}}>
          <Body>
            <Title style={{marginLeft: 10}}>Add new sighting</Title>
          </Body>
        </Header>
        <Content>
          <Form style={{padding: 0}}>
            <Item>
              <Label>Date</Label>
              <Timestamp />
            </Item>
            <Item inlineLabel>
              <Label>Location</Label>
              <Text>{location}</Text>
            </Item>
            <Item inlineLabel>
              <Label>Species:</Label>
              <Input value={this.state.species} onChangeText={ (species) => this.setState({ species })} />
            </Item>
            <Item>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Rarity"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.rarity}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="Common" value="Common" />
                <Picker.Item label="Rare" value="Rare" />
                <Picker.Item label="Extremely rare" value="Extremely rare" />
              </Picker>
            </Item>
            <Item inlineLabel>
              <Label>Notes:</Label>
              <Input value={this.state.notes} onChangeText={(notes) => this.setState({ notes })} />
            </Item>
          <Button block rounded style={{width: 200, backgroundColor: 'gray', margin: 10}} 
          onPress={() => this.save()}>
            <Text>Save</Text>
          </Button>
          <Button block rounded style={{width: 200, backgroundColor: 'gray', margin: 10}} 
          onPress={() => this.query()}>
            <Text>Query</Text>
          </Button>
          </Form>
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
