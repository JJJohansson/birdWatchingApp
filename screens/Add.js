import React from 'react';
import { StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import {
  Container, Row, Grid, Text, Form, Item, Button, Label,
  Input, Subtitle, Left, Icon, Content
} from "native-base";

export default class Add extends React.Component {
  static navigationOptions = { title: 'Add', };
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      species: '',
      rarity: '',
      timestamp: '',
      notes: '',
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

  save = () => {
    console.log('saved!')
  }

  render() {
    const { params } = this.props.navigation.state;

    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
      <Container>
        <Grid>
          <Row size={3}>
            <Form>
              <Item stackedLabel>
                <Label>Species</Label>
                <Input value={this.state.species} onChangeText={(species) => this.setState({ species })} />
              </Item>
              <Item stackedLabel>
                <Label>Rarity</Label>
                <Input value={this.state.rarity} onChangeText={(rarity) => this.setState({ rarity })} />
              </Item>
            </Form>
          </Row>
          <Row size={2}>
            <Button block style={{ margin: 15, marginTop: 50 }} onPress={() => this.save()}>
              <Text>Submit</Text>
            </Button>
          </Row>
        </Grid>
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
