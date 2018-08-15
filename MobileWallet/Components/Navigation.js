// import {createStackNavigator} from 'react-navigation';
import React from 'react';
import {Scene, Router, Stack, Drawer, Modal} from 'react-native-router-flux';
const SendTokens = require('./SendTokens.js');
const TokenDetailsScreen = require('./TokenDetailsScreen.js');
const TokensScreen = require('./TokensScreen.js');
const LoginScreen = require('./LoginScreen.js');
const SignupScreen = require('./SignupScreen.js');
const LoginOrSignup = require('./LoginOrSignup.js');
const MaitreSignup = require('./MaitreSignup.js');
const ShowPhrase = require('./ShowPhrase.js');
const SideMenuContent = require('./SideMenuContent.js');
const NameSignup = require('./NameSignup.js');
const EmailSignup = require('./EmailSignup.js');
const PhoneSignup = require('./PhoneSignup.js');
const PinSignup = require('./PinSignup.js');
const ModalPin = require('./ModalPin.js');



const RouterComponent = () => {

    return (
      <Router>
          <Scene key="root">
            <Scene key="LoginScreen" component={LoginScreen} hideNavBar="true" />
            <Scene key="LoginOrSignup" component={LoginOrSignup} hideNavBar="true" initial/>
            <Scene key="SignupScreen" component={SignupScreen} hideNavBar="true" />
            <Scene key="NameSignup" component={NameSignup} hideNavBar="true" />
            <Scene key="EmailSignup" component={EmailSignup} hideNavBar="true" />
            <Scene key="PhoneSignup" component={PhoneSignup} hideNavBar="true" />
            <Scene key="PinSignup" component={PinSignup} hideNavBar="true" />
            <Scene key = "Main" duration={0}>
              <Scene key="drawer" drawer duration={0} contentComponent={SideMenuContent} hideNavBar="true" > 
                <Scene key="MainStack">             
                  <Scene key="TokenDetails" component={TokenDetailsScreen} hideNavBar="true" />
                  <Scene key="SendTokens" component={SendTokens} hideNavBar="true"/>
                  <Scene key="TokensScreen" component={TokensScreen} hideNavBar="true" initial/>
                  <Scene key="ShowPhrase" component={ShowPhrase} hideNavBar="true"  />
                  <Scene key="MaitreSignup" component={MaitreSignup} hideNavBar="true" /> 
                </Scene>
              </Scene>
              <Scene key="PinModal" duration={0} component={ModalPin} hideNavBar="true"/>
            </Scene>
          </Scene>
      </Router>
    );
}; 


module.exports = RouterComponent;
