import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
// @flow

export default class App extends React.Component {
  state = {
    myName: 'To React Native World',
    isNameVisible: false
  }
  toggleName() {
    this.setState({
      isNameVisible: !this.state.isNameVisible
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Button title='Render Name Message' onPress={this.toggleName.bind(this)} />
        {
          this.state.isNameVisible ?
            <View>
              <Text style={styles.welcomeMessage}>{`Welcome ${this.state.myName}`}</Text>
              <Text style={{ color: 'red' }}>This styling also works</Text>
            </View>
            :
            undefined
        }
      </View>
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
  welcomeMessage: {
    color: 'blue',
  },
});
