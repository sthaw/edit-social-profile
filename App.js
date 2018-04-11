import React, { Component } from 'react';
import {View} from 'react-native'
import Profile from './components/Profile';

export default class App extends Component {
  render() {
    return (
      <View>
        <Profile 
          name={"John Smith"}
          website={"www.jsmith.com"}
          email={"jsmith@ucla.edu"}
          phone={"999082002"}
          bio={"I like dogs"}
          />
      </View>
    );
  }
}