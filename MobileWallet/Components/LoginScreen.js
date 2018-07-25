import React, {Component} from 'react';
import {Alert, Button, FlatList, TextInput, StyleSheet, Text, View,
 TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback  } from 'react-native';
import {connect} from 'react-redux';
import {emailChanged, passwordChanged, loginUser} from '../Actions';
import {Spinner} from './Common';
import {Actions} from 'react-native-router-flux';

 

class LoginScreen extends Component {


  onEmailChange(text) {
    this.props.emailChanged(text);
  }
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
  onButtonPress() {
    const {email, password} = this.props;

    this.props.loginUser({email, password});
  }
  renderError() {
    if (this.props.error) {
      return (
        <View> 
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
    return (
        <View> 
          <Text style={styles.errorTextStyle}>
             {' '}
          </Text>
        </View>
      );
  }
  renderLoginButton() {
    if (this.props.loading) {
      return (<Spinner size="large"/>);
    }
    return (
      <TouchableOpacity onPress= {this.onButtonPress.bind(this)}>
              <View style = {{backgroundColor: '#5c4da0', alignItems: 'center', 
                              justifyContent: 'center', borderRadius: 30, height: 50, margin: 70, marginTop: 0}}
                     >
                     <Text style={{color:'white', fontSize: 25}}> Login </Text>
              </View>
        </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableWithoutFeedback onPress={() => Actions.popTo("LoginOrSignup")}>
            <View>
              <Text style={styles.navBarButton}>Back</Text>
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.navBarHeader}>Please Login</Text>
          <Text style={styles.navBarButton}></Text>
        </View>
        <View style={{margin: 12, marginBottom: 0}}>
          <TextInput
            style={{height: 100, paddingLeft: 30, fontSize: 25, backgroundColor: '#F8F8F8'}}
            keyboardType='email-address'
            placeholder="Email"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
          <View style={{ height: 8}} />
          <TextInput
            style={{height: 100, paddingLeft: 30, fontSize: 25, backgroundColor: '#F8F8F8'}}
            secureTextEntry={true}

            placeholder="Password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </View>

        {this.renderError()}

        
        {this.renderLoginButton()}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorTextStyle: {
    margin: 3,
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  navBar: {
    flexDirection: 'row',
    paddingTop: 10,
    height: 75,
    backgroundColor: '#F8F8F8',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: .2,
    zIndex:999
  },
  navBarHeader: {
    flex: 1,
    color: '#4c3e99',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 25,
    fontSize: 20,
  },
  navBarButton: {
    color: '#4c3e99',
    textAlign:'center',
    paddingTop: 25,
    width: 64
  },
});

const mapStateToProps = state => {
  const {email, password, error, loading} = state.auth;
  return {email, password, error, loading};

};

module.exports = connect(mapStateToProps, 
  {emailChanged, passwordChanged,  loginUser})(LoginScreen);

