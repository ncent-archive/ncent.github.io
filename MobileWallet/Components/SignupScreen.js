import React, {Component} from 'react';
import {Alert, Button, FlatList, TextInput, StyleSheet, Text, View,
 TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback  } from 'react-native';
import {Actions} from 'react-native-router-flux';

class SignupScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {usernameEntered: '', passwordEntered: '', lastname: '', firstname: '', email: '', phoneNumber: '', password: '', confirmedPassword: ''};
  }

  signUp() {
    Actions.LoginScreen();
    return;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableWithoutFeedback onPress={() => Actions.LoginOrSignup()}>
            <View>
              <Text style={styles.navBarButton}>Back</Text>
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.navBarHeader}>Please Sign Up</Text>
          <TouchableWithoutFeedback onPress={() => this.signUp()}>
            <View>
              <Text style={styles.navBarButton}>Finish</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
          <TextInput
            autoCorrect= {false}
            style={{height: 50, paddingLeft: 30, fontSize: 20}}
            placeholder="First"
            onChangeText={(firstname) => this.setState({firstname})}
          />
          <TextInput
            autoCorrect= {false}
            style={{height: 50, paddingLeft: 30, backgroundColor: 'lightgray', fontSize: 20}}
            placeholder="Last"
            onChangeText={(lastname) => this.setState({lastname})}
          />
        <TextInput
          autoCorrect= {false}
          style={{height: 50, paddingLeft: 30, fontSize: 20}}
          placeholder="Email"
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput
          autoCorrect= {false}
          style={{height: 50, paddingLeft: 30, backgroundColor: 'lightgray', fontSize: 20}}
          placeholder="Phone Number"
          onChangeText={(phoneNumber) => this.setState({phoneNumber})}
        />
        <TextInput
          autoCorrect= {false}
          style={{height: 50, paddingLeft: 30, fontSize: 20}}
          placeholder="Username"
          onChangeText={(usernameEntered) => this.setState({usernameEntered})}
        />
        <TextInput
          autoCorrect= {false}
          style={{height: 50, paddingLeft: 30, backgroundColor: 'lightgray', fontSize: 20}}
          placeholder="Password"
          onChangeText={(passwordEntered) => this.setState({passwordEntered})}
        />
        <TextInput
          autoCorrect= {false}
          style={{height: 50, paddingLeft: 30, fontSize: 20}}
          placeholder="Confirm Password"
          onChangeText={(confirmedPassword) => this.setState({confirmedPassword})}
        />

        <View style={styles.content}>
          <Button
            title= "Sign Up"
            onPress= {() => this.signUp()}  
          />
          <Button
            title= "Already Have an Account? Login"
            onPress= {() => Actions.LoginScreen()}  
          />

        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    paddingTop: 30,
    height: 64,
    backgroundColor: '#1EAAF1'
  },
  navBarHeader: {
    flex: 1,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  navBarButton: {
    color: '#FFFFFF',
    textAlign:'center',
    width: 64
  },
  content: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 40
  },
  balance_content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#374046'
  },
  text: {
    color: '#EEEEEE'
  },
});

module.exports = SignupScreen;