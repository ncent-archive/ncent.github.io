// import {createStackNavigator} from 'react-navigation';
import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
const SendTokens = require('./SendTokens.js');
const TokenDetailsScreen = require('./TokenDetailsScreen.js');
const TokensScreen = require('./TokensScreen.js');
const LoginScreen = require('./LoginScreen.js');
const SignupScreen = require('./SignupScreen.js');
const LoginOrSignup = require('./LoginOrSignup.js');



const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="TokenDetails" component={TokenDetailsScreen} hideNavBar="true"/>
        <Scene key="SendTokens" component={SendTokens} hideNavBar="true"/>
        <Scene key="LoginScreen" component={LoginScreen} hideNavBar="true"/>
        <Scene key="SignupScreen" component={SignupScreen} hideNavBar="true"/>
        <Scene key="LoginOrSignup" component={LoginOrSignup} hideNavBar="true" initial/>
        <Scene key="TokensScreen" component={TokensScreen} hideNavBar="true" />
      </Scene>
    </Router>
  );
};


module.exports = RouterComponent;
