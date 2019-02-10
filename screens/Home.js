import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import {
  Container, Body, Right, Header, Title, Content, Icon
} from "native-base";
import DropdownList from '../components/DropdownList.js';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('birdwatcher.db');

export default class Home extends React.Component {
  static navigationOptions = { header: null };
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      birds: [],
    };
    
    this.props.navigation.addListener('willFocus', () => this.updateSightings());
  }

 componentDidMount() {   
  db.transaction(transaction => {
    transaction.executeSql(
      'create table if not exists sightings (id text primary key not null, species text not null, rarity text not null, timestamp text not null, latitude text, longitude text, notes text);'
    );
  });
  this._isMounted = true;
 }

 componentWillUnmount() {
   this._isMounted = false;
 }
  
  updateSightings = () => {
    db.transaction(transaction => {
      transaction.executeSql('select * from sightings',
        [],
        (_, { rows: { _array } }) => this.setState({ birds: _array }));
    });
  }

  onBack = () => {
    this.updateSightings();
  }

  render() {
    if (this._isMounted) {
      this.updateSightings();
    }

    const { navigate } = this.props.navigation;

    return (
      <Container style={{ backgroundColor: "#FE5F55" }}>
        <StatusBar hidden={true} />
        <Header style={{ backgroundColor: "#4F6367"}}>
          <Body>
            <Title style={{marginLeft: 10}}>Bird_Watcher</Title>
          </Body>
          <Right>
            <Icon style={{ fontSize: 30, color: 'white', marginRight: 10 }} name="add-circle" onPress={() => navigate('Add', { onGoBack: () => this.onBack(),}) }/>
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