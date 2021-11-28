import React, { Component } from 'react';
import { View, Text, Image, TextInput, StyleSheet, Button } from 'react-native';

class SelectUserType extends Component {
  render() {
    return (
      <View>
        <Text>Tagd</Text>

        <Button title="Host" onPress={this.props.hostPage} />

        <Button title="Guest" onPress={this.props.guestPage} />

        <Button title="Next" />
      </View>
    )
  }
}

export default SelectUserType;
