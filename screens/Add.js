import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import {
  Container, Content, Picker, Text, Form, Item, Button, Label,
  Input, Header, Body, Icon, Title
} from "native-base";
import DateComponent from '../components/DatePicker.js';
import { Location, Permissions } from 'expo';

export default class Add extends React.Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    var d = new Date();
    this.state = {
      isReady: false,
      species: '',
      rarity: '',
      notes: '',
      timestamp: '',
      year: d.getFullYear(),
      month: d.getMonth(),
      date: d.getDate(),
      hours: d.getHours(),
      minutes: d.getMinutes(),
      selected2: undefined,
      latitude: '',
      longitude: '',
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
    console.log('saved!')
    this.getLocation();
  }

  
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }

  render() {
    const { params } = this.props.navigation.state;

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
              <DateComponent />
            </Item>
            <Item inlineLabel>
              <Label>Species:</Label>
              <Input value={this.state.species} onChangeText={ (species) => this.setState({ species })} />
            </Item>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Rarity"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="Common" value="01" />
                <Picker.Item label="Rare" value="02" />
                <Picker.Item label="Extremely rare" value="03" />
              </Picker>
            </Item>
            <Item inlineLabel last>
              <Label>Notes:</Label>
              <Input value={this.state.notes} onChangeText={(notes) => this.setState({ notes })} />
            </Item>
          <Button block rounded style={{width: 200, backgroundColor: 'gray', margin: 10}} 
          onPress={() => this.save()}>
            <Text>Save</Text>
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
