import React, { Component } from "react";
import { Alert } from 'react-native';
import { Container, H2, Content, Icon, Accordion, Text, View } from "native-base";

export default class DropdownList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            birds: props.birds,
        }
    }

  _renderHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center" ,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#000000" }}>
        <Text style={{ fontWeight: "600" }}>
          {" "}{item.timestamp}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
          : <Icon style={{ fontSize: 18 }} name="add-circle" />}
      </View>
    );
  }

  _renderContent(item) {
    let location = item.latitude ? `${item.latitude}, ${item.longitude}` : 'unknown';
    return (
        <Content>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.listItems}>
                location: { location }
            </Text>
            <Icon style={{ fontSize: 25, marginRight: 50 }} name="pin" onPress={() => Alert.alert('need to fix navigation lol')} />
            <Icon style={{ fontSize: 18 }} name="trash" />
          </View>
          <Text style={styles.listItems}>
              species: {item.species}
          </Text>
          <Text style={styles.listItems}>
              rarity: {item.rarity}
          </Text>
          <Text style={styles.listItems}>
              notes: {item.notes}
          </Text>
        </Content>
    );
  }
  
  render() {
    return (
      <Container>
        <Content padder style={{ backgroundColor: "#fff" }}>
          <H2 style={{ marginBottom: 10 }}>Your sightings:</H2>
          <Accordion
            dataArray={this.state.birds}
            animation={true}
            expanded={true}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        </Content>
      </Container>
    );
  }
}

const styles = {
    listItems: {
        backgroundColor: "#ffffff",
        padding: 10,
        fontStyle: "italic",
    },
}