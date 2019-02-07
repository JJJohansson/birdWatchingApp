/*

  TODO:
    Add.js
      - fix the "Warning: Can't call setState (or forceUpdate) on an unmounted component."

    DrowdownList.js
      - Header
        - Name of the bird species on the left side of the bar
        - Timestamp (dd mmm yyyy hh:mm) on the right side of the bar.

      - Content
        - Information from top to bottom: rarity, location, notes

      - Header and Content
        - Header bar color needs to be darker
        - Every other line in content needs to be in white and every other in some lightish color

      - Expand buttons
        - Plus should be arrow down and minus arrow up

*/


import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import {
  Container, Text, Body, Right, Button, Header, Title, Content, Icon
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
      birds: undefined,
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
    }/*, null, () => console.log('sightings updated:\n',this.state.birds)*/);
  }

  onBack = () => {
    console.log("GOT BACK")
    this.updateSightings();
  }

  deleteTable = () => {
    db.transaction(transaction => {
      transaction.executeSql(
        'delete from sightings;'
      );
    }, null, this.updateSightings);
  }

  

  render() {
    if (this._isMounted) {
      this.updateSightings();
    }

    const { navigate } = this.props.navigation;
    const birds = this.state.birds ? this.state.birds : null;
    let sightingsList = this.state.birds ? <DropdownList birds={this.state.birds} navigation={this.props.navigation} /> : <Text>No sightings yet..</Text>

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
          { sightingsList }
          <Button block rounded style={{width: 200, backgroundColor: 'gray', margin: 10}} 
          onPress={() => this.deleteTable()}>
            <Text>HARD RESET</Text>
          </Button>
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


            <Button hasText transparent onPress={() => navigate('Add', { onGoBack: () => this.onBack(),}) }>
              <Text>New</Text>
    </Button>
          
          <Button block rounded style={{width: 200, backgroundColor: 'gray', margin: 10}} 
          onPress={() => this.updateSightings()}>
            <Text>query</Text>
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