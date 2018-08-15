import React, {Component} from 'react';
import {Alert, Button, FlatList, TextInput, StyleSheet, Text, View,
 TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback  } from 'react-native';
import {connect} from 'react-redux';
import {maitreEmailChanged, maitreSubscribe} from '../Actions';
import {Spinner} from './Common';
import {Actions} from 'react-native-router-flux';
import {Icon} from 'react-native-elements';


class MaitreSignup extends Component {


  onEmailChange(text) {
    this.props.maitreEmailChanged(text);
  }
  onButtonPress() {
    const {email} = this.props;

    this.props.maitreSubscribe({email});
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

  renderSuccess() {
    if (this.props.success) {
      return (
        <View style={{marginTop: 20, marginBottom: 10}}>
          <Text style = {styles.successTextStyle}>
            Sign up successful!
          </Text>
          <Text style = {styles.successTextStyle}>
            Check your email to confirm
          </Text>
        </View>
      )
    }
    else  {
      return (
        <View style={{marginTop: 20, marginBottom: 10}}>
          <Text style = {styles.successTextStyle}>
            Sign up for early access to investor whitelist and corporate updates
          </Text>
        </View>
      );
    }
  }

  renderSignupButton() {
    if (this.props.loading) {
      return (<Spinner size="large"/>);
    }
    return (
      <TouchableOpacity onPress= {this.onButtonPress.bind(this)}>
              <View style = {{backgroundColor: '#5c4da0', alignItems: 'center', 
                              justifyContent: 'center', borderRadius: 30, height: 50, margin: 70, marginTop: 0}}
                     >
                     <Text style={{color:'white', fontSize: 25}}> Sign Up </Text>
              </View>
        </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableWithoutFeedback onPress={() => Actions.drawerOpen()}>
            <View style={{justifyContent: 'center', paddingLeft: 10}}>
              <Icon
                size={30}
                name='menu'
                color='#4c3e99' />
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.navBarHeader}>Early Access</Text>
            <View style={{justifyContent: 'center', paddingLeft: 10}}>
              <Icon
                size={30}
                name='menu'
                color='#0000' />
            </View>
        </View>
        {this.renderSuccess()}
        <View style={{margin: 12, marginBottom: 0}}>
          <TextInput
            style={{height: 100, paddingLeft: 30, fontSize: 25, backgroundColor: '#F8F8F8'}}
            keyboardType='email-address'
            placeholder="Email"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </View>

        {this.renderError()}
        {this.renderSignupButton()}
        

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
  successTextStyle: {
    margin: 5,
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black'
    //color: '#5c4da0'
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
  const {email, error, success, loading} = state.maitre;
  return {email, error, success, loading};

};

module.exports = connect(mapStateToProps, 
  {maitreEmailChanged, maitreSubscribe})(MaitreSignup);
