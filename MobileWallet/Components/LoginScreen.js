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
      return <Spinner size="large"/>;
    }
    return (
      <TouchableOpacity onPress= {this.onButtonPress.bind(this)}>
              <View style = {{backgroundColor: 'orange', alignItems: 'center', 
                              justifyContent: 'center', borderRadius: 30, height: 60, margin: 30, marginTop: 0}}
                     >
                     <Text style={{color:'white', fontSize: 30}}> Login </Text>
              </View>
        </TouchableOpacity>
    )
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableWithoutFeedback onPress={() => Actions.TokensScreen()}>
            <View>
              <Text style={styles.navBarButton}>Back</Text>
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.navBarHeader}>Please Login</Text>
          <Text style={styles.navBarButton}></Text>
        </View>

        <TextInput
          style={{height: 100, paddingLeft: 30, fontSize: 25}}

          placeholder="Email"
          onChangeText={this.onEmailChange.bind(this)}
          value={this.props.email}
        />
        <TextInput
          style={{height: 100, paddingLeft: 30, fontSize: 25, backgroundColor: 'lightgray'}}
          secureTextEntry={true}

          placeholder="Password"
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
        />

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

const mapStateToProps = state => {
  const {email, password, error, loading} = state.auth;
  return {email, password, error, loading};

};

module.exports = connect(mapStateToProps, 
  {emailChanged, passwordChanged,  loginUser})(LoginScreen);

