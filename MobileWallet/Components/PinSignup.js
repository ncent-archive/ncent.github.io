import React, {Component} from 'react';
import {Alert, Button, FlatList, TextInput, StyleSheet, Text, View,
 TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback  } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';
import {userUpdate, createUser, tempPinEntered, pinsDontMatch} from '../Actions';
import {Spinner} from './Common';
 
class PinSignup extends Component {
 
  renderButtons() {
    if (this.props.loading) {
      console.log("hi");
      return (
        <View style={{marginTop: 50}}>
          <Spinner size="large" />
        </View>
        );
    }
    return (
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 30}}>
            {this.renderEnterMessage()}
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 40}}>
              {this.passwordToIcons()}        
          </View>
          
          <TextInput
            style={{height: 0, paddingLeft: 30, fontSize: 0}}
            secureTextEntry={true}
            ref='pin_input'
            autoFocus={true}
            placeholder="PIN"
            keyboardType="number-pad"
            onChangeText={(text) => this.props.userUpdate({prop:'pin', value: text})}
            value={this.props.pin} />
        </View>
      
      );
  }

  renderNavBarHeader() {
  	const secondPin = false;
  	if (secondPin) {
  		return "Verify Your PIN";
  	}
  	else {
  		return "Create a 4-digit PIN";
  	}
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

  componentWillReceiveProps(newProps) {
    console.log(newProps.pin);
    if (newProps.pin.length === 4 && newProps.tempPin === '') {   
      let pin = newProps.pin;
      this.props.tempPinEntered(pin);
    }
    else if (newProps.pin.length === 4 && newProps.tempPin !== '') {
      if (newProps.pin === newProps.tempPin) {
        const {first, last, email, username, phone, pin} = newProps;
        this.props.createUser({first, last, email, username, phone, pin});
      }
      else {
        this.props.pinsDontMatch({});
      }
    } 
  }

  passwordToIcons() {
    if (this.props.pin.length === 0) {
      return (
        <View style={{flexDirection: 'row'}} >
          <Icon size={40} type='font-awesome' name='circle-thin' color='#4c3e99' />
          <View style={{marginHorizontal: 15}} />
          <Icon size={40} type='font-awesome' name='circle-thin' color='#4c3e99' />
          <View style={{marginHorizontal: 15}} />
          <Icon size={40} type='font-awesome' name='circle-thin' color='#4c3e99' />
          <View style={{marginHorizontal: 15}} />
          <Icon size={40} type='font-awesome' name='circle-thin' color='#4c3e99' />
        </View>
        )
    }
    if (this.props.pin.length === 1) {
      return (
        <View style={{flexDirection: 'row'}} >
          <Icon size={40} type='font-awesome' name='circle' color='#4c3e99' />
          <View style={{marginHorizontal: 15}} />
          <Icon size={40} type='font-awesome' name='circle-thin' color='#4c3e99' />
          <View style={{marginHorizontal: 15}} />
          <Icon size={40} type='font-awesome' name='circle-thin' color='#4c3e99' />
          <View style={{marginHorizontal: 15}} />
          <Icon size={40} type='font-awesome' name='circle-thin' color='#4c3e99' />
        </View>
      )
    }
    if (this.props.pin.length === 2) {
      return (
        <View style={{flexDirection: 'row'}} >
          <Icon size={40} type='font-awesome' name='circle' color='#4c3e99' />
          <View style={{marginHorizontal: 15}} />
          <Icon size={40} type='font-awesome' name='circle' color='#4c3e99' />
          <View style={{marginHorizontal: 15}} />
          <Icon size={40} type='font-awesome' name='circle-thin' color='#4c3e99' />
          <View style={{marginHorizontal: 15}} />
          <Icon size={40} type='font-awesome' name='circle-thin' color='#4c3e99' />
        </View>
      )
    }
    if (this.props.pin.length === 3) {
      return (
        <View style={{flexDirection: 'row'}} >
          <Icon size={40} type='font-awesome' name='circle' color='#4c3e99' />
          <View style={{marginHorizontal: 15}} />
          <Icon size={40} type='font-awesome' name='circle' color='#4c3e99' />
          <View style={{marginHorizontal: 15}} />
          <Icon size={40} type='font-awesome' name='circle' color='#4c3e99' />
          <View style={{marginHorizontal: 15}} />
          <Icon size={40} type='font-awesome' name='circle-thin' color='#4c3e99' />
        </View>
      )
    }
    if (this.props.pin.length === 4) {
      return (
        <View style={{flexDirection: 'row'}} >
          <Icon size={40} type='font-awesome' name='circle' color='#4c3e99' />
          <View style={{marginHorizontal: 15}} />
          <Icon size={40} type='font-awesome' name='circle' color='#4c3e99' />
          <View style={{marginHorizontal: 15}} />
          <Icon size={40} type='font-awesome' name='circle' color='#4c3e99' />
          <View style={{marginHorizontal: 15}} />
          <Icon size={40} type='font-awesome' name='circle' color='#4c3e99' />
        </View>
      )
    }
  }

  renderEnterMessage() {
    if (this.props.tempPin !== '') {
      return (<Text style={{fontSize: 20}}> Confirm Your PIN </Text> );
    }
    else  {
      return (<Text style={{fontSize: 20}}> Please Enter Your PIN </Text> );
    }
  }

  render() {
    return (

      <View style={styles.container}>
        <View style={styles.navBar}>
            <TouchableWithoutFeedback onPress={()=> Actions.popTo("EmailSignup")}>
              <View>
                <Text style={styles.navBarButton}>Back</Text>
              </View>
            </TouchableWithoutFeedback>
          <Text style={styles.navBarHeader}>Create Your PIN</Text>
          <Text style={styles.navBarButton}></Text>
        </View>
        <View style={{ height: 8}} />
        <View style={{margin: 12, marginBottom: 40}}>         
          <View style={{paddingBottom: 40,
    paddingHorizontal: 20}}>

        
        {this.renderButtons()}
        
        
          </View>
          
        </View>


        {this.renderError()}
        
        
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


const mapStateToProps = (state) => {
  const {first, last, email, username, phone, pin, confirm, error, loading, tempPin} = state.signup;
  return {first, last, email, username, phone, pin, confirm, error, loading, tempPin};
}

module.exports = connect(mapStateToProps, {userUpdate, createUser, tempPinEntered, pinsDontMatch})(PinSignup);