import React, {Component} from 'react';
import {Button, FlatList, TextInput, StyleSheet, Text, View,
 TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback  } from 'react-native';
import {Actions} from 'react-native-router-flux';
class LoginOrSignup extends Component {

  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <View style={styles.container}>
        <View style = {{flex:2}}>
          <View style = {{flex:1}}></View>
          <View style = {{flex:6, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 30, textAlign: 'center'}}> Welcome to the nCent mobile wallet </Text>
          </View>
        </View>
        <View style= {{flex: 1}}>
          <TouchableOpacity style={{flex: 1}} onPress= {() => Actions.LoginScreen()}>
              <View style = {{backgroundColor: 'orange', alignItems: 'center', 
                              justifyContent: 'center', flex: 1}}
                     >
                     <Text style={{color:'white', fontSize: 30}}> Login </Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1}} onPress= {() => Actions.SignupScreen()}>
              <View style = {{backgroundColor: 'skyblue', alignItems: 'center', 
                              justifyContent: 'center', flex: 1}}
                     >
                     <Text style={{color:'white', fontSize: 30}}> Sign Up </Text>
              </View>
          </TouchableOpacity>
        </View>
        
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

module.exports = LoginOrSignup;