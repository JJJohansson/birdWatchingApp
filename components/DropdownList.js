import React, { Component } from "react";
import { Container, H2, Content, Icon, Accordion, Text, View } from "native-base";

export default class DropdownList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            birds: props.birds
        }
    }

  _renderHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center" ,
        backgroundColor: "#c9c1b6",
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
    return (
        <Content>
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