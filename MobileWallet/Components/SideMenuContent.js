import React from 'react';
import { AppState, StyleSheet, Text, View, ViewPropTypes, Button, TouchableHighlight } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';
import {signOutFromSideMenu} from '../Actions';



class SideMenuContent extends React.Component {

  state = {
    appState: AppState.currentState
  }

  componentDidMount() {
    console.log("mounting side menu");
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    console.log("unmounting side menu");
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log("listening in side menu"); 
      console.log(this.state.appState);
      console.log(nextAppState);    
      Actions.PinModal();
    }
    this.setState({appState: nextAppState});
  }


  logOut() {
    this.props.signOutFromSideMenu();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop: 15}}>
          <Icon
                size={70}
                type='material-community'
                name='account-circle'
                color='#4c3e99'
                paddingTop={10}
                paddingRight={20}/>
          
        </View>
        <View style={{flexDirection:'row', justifyContent: 'center', marginBottom: 18}}>
          <Text style={styles.titleText}> Your Account </Text>
        </View>

        <View style={{flexDirection: 'row', paddingTop: 1, height: 1, backgroundColor: "lightgray"}}></View> 
          <TouchableHighlight onPress={() => Actions.replace("TokensScreen")} underlayColor="lightgray">
            <View style={{flexDirection: 'row', paddingLeft: 15, height: 40, justifyContent: 'flex-start', alignItems:'center'}}>
              <Icon
                size={20}
                type='material-community'
                name='coin'
                color='#4c3e99' />
              <Text style={{paddingLeft: 15, fontSize: 20}}>Tokens</Text>
            </View>
          </TouchableHighlight>

          <View style={{flexDirection: 'row', paddingTop: 1, height: 1, backgroundColor: "lightgray"}}></View>
          <TouchableHighlight onPress={() => Actions.replace("ShowPhrase")} underlayColor="lightgray">
            <View style={{flexDirection: 'row', paddingLeft: 15, height: 40, justifyContent: 'flex-start', alignItems:'center'}}>
              <Icon
                size={20}
                type='entypo'
                name='key'
                color='#4c3e99' />
              <Text style={{paddingLeft: 15, fontSize: 20}}>View Seed Phrase</Text>
            </View>
          </TouchableHighlight>

          <View style={{flexDirection: 'row', paddingTop: 1, height: 1, backgroundColor: "lightgray"}}></View> 
          <TouchableHighlight onPress={() => Actions.replace("MaitreSignup")} underlayColor="lightgray">
            <View style={{flexDirection: 'row', paddingLeft: 15, height: 40, justifyContent: 'flex-start', alignItems:'center'}}>
              <Icon
                size={20}
                type='font-awesome'
                name='ticket'
                color='#4c3e99' />
              <Text style={{paddingLeft: 15, fontSize: 20}}>Early Access</Text>
            </View>
          </TouchableHighlight>  

          <View style={{flexDirection: 'row', paddingTop: 1, height: 1, backgroundColor: "lightgray"}}></View>
          <TouchableHighlight onPress={() => this.logOut()} underlayColor="lightgray">
            <View style={{flexDirection: 'row', paddingLeft: 15, height: 40, justifyContent: 'flex-start', alignItems:'center'}}>
              <Icon
                size={20}
                type='feather'
                name='log-out'
                color='#4c3e99' />
              <Text style={{paddingLeft: 15, fontSize: 20}}>Log Out</Text>
            </View>
          </TouchableHighlight>

          <View style={{flexDirection: 'row', paddingTop: 1, height: 1, backgroundColor: "lightgray"}}></View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  titleText: {
    paddingRight: 20,
    marginTop: 10,
    color: 'black',
    //color: '#4c3e99',
    //fontWeight: 'bold',
    fontSize: 23,
    alignItems: 'center',
    justifyContent: 'center'
  },
});


const mapStateToProps = (state) => {
  const {} = state.side;
  return {};
}

module.exports = connect(mapStateToProps, {signOutFromSideMenu})(SideMenuContent);