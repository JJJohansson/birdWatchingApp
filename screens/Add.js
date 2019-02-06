import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {
  Container, Content, Picker, Text, Form, Item, Button, Label,
  Input, Header, Body, Icon, Title, Toast
} from "native-base";
import Timestamp from '../components/Timestamp.js';
import { Location, Permissions, SQLite } from 'expo';

const db = SQLite.openDatabase('birdwatcher.db');

export default class Add extends React.Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      species: '',
      rarity: 'Common',
      notes: '',
      timestamp: '',
      location: null,
      latitude: null,
      longitude: null,
      d: new Date()
    };
  }

  // gotta wait for the fonts to load
  async componentDidMount() {
    this.getLocation();
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
    const utc = date.toUTCString();
    const pk = utc.replace(/ /g,'');  // timestamp are unique = easy primary key

    try {
      db.transaction(transaction => {
        transaction.executeSql('insert into sightings (id, species, rarity, timestamp, latitude, longitude, notes) values (?, ?, ?, ?, ?, ?, ?)',
        [pk, this.state.species, this.state.rarity, date.toUTCString(), latitude, longitude, this.state.notes]);
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
    let location =  this.state.location ? `${this.state.latitude}, ${this.state.longitude}` : '';

    return (
      <Container>
        <Header style={{ backgroundColor: "#4F6367"}}>
          <Body>
            <Title style={{marginLeft: 10}}>Add new sighting</Title>
          </Body>
        </Header>
        <Content>
          <Form style={{padding: 10}}>
            <Item stackedLabel>
              <Label style={styles.label}>Species:</Label>
              <Input value={this.state.species} onChangeText={ (species) => this.setState({ species })} />
            </Item>
            <Item picker>
              <Label style={styles.label}>Rarity:</Label>
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
            <Item disabled stackedLabel>
              <Label style={styles.label}>Date:</Label>
              <Input disabled placeholder={this.state.d.toUTCString()}/>
            </Item>
            <Item disabled stackedLabel>
              <Label style={styles.label}>Location:</Label>
              <Input disabled placeholder={location}/>
            </Item>
            <Item stackedLabel>
              <Label style={styles.label}>Notes:</Label>
              <Input value={this.state.notes} onChangeText={(notes) => this.setState({ notes })} />
            </Item>
            <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
              <Button light block rounded style={{width: 150, margin: 10}} 
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
  label: {
    fontSize: 15,
    fontWeight: 'bold',
  }
});
