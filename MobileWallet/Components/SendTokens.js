import React, {Component} from 'react';
import {Alert, Button, FlatList, TextInput, StyleSheet, Text, View,
 TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback  } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {sendInfoUpdate, sendTokensToAddress, cancelTransaction} from '../Actions';
import {Spinner} from './Common';


class SendTokens extends Component {


  sendTokens() {
    const {address, amount} = this.props;
    const tokenType = this.props.tokenType;
    console.log(tokenType);
    this.props.sendTokensToAddress({address, amount, tokenType});
  }

  cancel() {
    this.props.cancelTransaction();
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

  render() {
    return (

      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableWithoutFeedback onPress={() => this.cancel()}>
            <View>
              <Text style={styles.navBarButton}>Cancel</Text>
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.navBarHeader}>Send {this.props.tokenType}</Text>
          <Text style={styles.navBarButton}></Text>
        </View>
        <TextInput
          style={{height: 100, paddingLeft: 30, fontSize: 25}}
          placeholder="Address of Recipient"
          keyboardType = 'email-address'
          value={this.props.address}
          onChangeText={(text) => this.props.sendInfoUpdate({prop:'address', value: text})}
        />

        <TextInput
          style={{height: 100, paddingLeft: 30, fontSize: 25, backgroundColor: 'lightgray'}}
          placeholder="Amount"
          keyboardType = 'numeric'
          value={this.props.amount}
          onChangeText={(text) => this.props.sendInfoUpdate({prop:'amount', value: text})}
        />
        {this.renderError()}

        <View style={{flex: 1}}>
          <TouchableOpacity onPress= {() => this.sendTokens()}>
                <View style = {{backgroundColor: '#6D6792', alignItems: 'center', 
                                justifyContent: 'center', borderRadius: 30, height: 50, margin: 70, marginTop: 0}}
                       >
                       <Text style={{color:'white', fontSize: 20}}> Send </Text>
                </View>
          </TouchableOpacity>
        </View>
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
    shadowOpacity: .2
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
  const {address, amount, error, loading} = state.sendTokens;
  return {address, amount, error, loading};
}

module.exports = connect(mapStateToProps, {sendInfoUpdate, sendTokensToAddress, cancelTransaction})(SendTokens);

