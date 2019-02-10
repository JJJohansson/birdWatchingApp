import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {
  Container, Content, Picker, Text, Form, Item, Button, Label,
  Input, Header, Body, Icon, Title
} from "native-base";
import { Location, Permissions, SQLite } from 'expo';

const db = SQLite.openDatabase('birdwatcher.db');

export default class Add extends React.Component {
  static navigationOptions = { header: null };
  _isMounted = false;
  date = new Date();
  constructor(props) {
    super(props);
    this.state = {
      species: '',
      rarity: 'Common',
      notes: '',
      timestamp: this.date.toUTCString().slice(0, this.date.toUTCString().length-7),
      location: null,
      latitude: null,
      longitude: null,
    };
  }

  // gotta wait for the fonts to load
  async componentDidMount() {
    this.getLocation();
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false;
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

  save = () => {
    const latitude = this.state.latitude ? this.state.latitude : '';
    const longitude = this.state.longitude ? this.state.longitude : '';
    const date = new Date();
    const timestamp = date.toUTCString().slice(0,date.toUTCString().length-7);
    const pk = date.toUTCString().replace(/ /g,'');  // timestamps are unique = easy primary key

    try {
      db.transaction(transaction => {
        transaction.executeSql('insert into sightings (id, species, rarity, timestamp, latitude, longitude, notes) values (?, ?, ?, ?, ?, ?, ?)',
        [pk, this.state.species, this.state.rarity, timestamp, latitude, longitude, this.state.notes]);
      }, (error) => {
        console.log(error.message);
        Alert.alert(error.message)
      }, this.success);
    } catch (error) {
      console.log(error);
      Alert(error.message);
    }
  }

  success = () => {
    this.props.navigation.state.params.onGoBack();
    this.props.navigation.goBack();
  }

  cancel = () => {
    const { goBack } = this.props.navigation;
    goBack();

  }

  onRarityChange(value) {
    this.setState({
      rarity: value
    });
  }

  render() {
    let location = this.state.location ? `${this.state.latitude}, ${this.state.longitude}` : '';

    return (
      <Container>
        <Header style={{ backgroundColor: "#4F6367"}}>
          <Body>
            <Title style={{marginLeft: 10}}>Add new sighting</Title>
          </Body>
        </Header>
        <Content>
          <Form style={{padding: 0}}>
            <Item inlineLabel style={{ padding: 10 }}>
              <Label>Date:</Label>
              <Text>{this.state.timestamp}</Text>
            </Item>
            <Item inlineLabel style={{ padding: 10 }}>
              <Label>Location:</Label>
              <Text>{location}</Text>
            </Item>
            <Item inlineLabel>
              <Label>Species:</Label>
              <Input value={this.state.species} onChangeText={ (species) => this.setState({ species })} />
            </Item>
            <Item inlineLabel>
              <Label>Rarity:</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Rarity"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.rarity}
                onValueChange={this.onRarityChange.bind(this)}
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
            <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
              <Button danger block rounded style={{width: 150, margin: 10}} 
              onPress={() => this.cancel()}>
                <Text>Cancel</Text>
              </Button>
              <Button success block rounded style={{width: 150, margin: 10}} 
              onPress={() => this.save()}>
                <Text>Save</Text>
              </Button>
            </View>
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
