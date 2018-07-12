import React, {Component} from 'react';
import {Alert, Button, FlatList, TextInput, StyleSheet, Text, View,
 TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback  } from 'react-native';
import {Actions} from 'react-native-router-flux';

class SendTokens extends Component {
  constructor(props) {
    super(props);
    this.state = {address: '', amount: '', balance: this.getBalance(), tokenName: 'hi'};
  }

  getBalance() {
    return 0.0;
  }

  sendTokens() {
    // if (this.state.address === '') {
    //   Alert.alert('Error', 'Invalid address');
    //   return;
    // }
    // if (this.state.amount === '') {
    //   Alert.alert('Error', 'Invalid amount');
    //   return;
    // }
    return;
  }

  render() {
    const tokenName = "placeholder";
    return (

      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableWithoutFeedback onPress={() => Actions.TokenDetails()}>
            <View>
              <Text style={styles.navBarButton}>Cancel</Text>
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.navBarHeader}>Send {tokenName}</Text>
          <Text style={styles.navBarButton}></Text>
        </View>
        <TextInput
          style={{height: 100, paddingLeft: 30, fontSize: 25}}
          placeholder="Address of Recipient"
          onChangeText={(address) => this.setState({address})}
        />

        <TextInput
          style={{height: 100, paddingLeft: 30, fontSize: 25, backgroundColor: 'lightgray'}}
          placeholder="Amount"
          onChangeText={(amount) => this.setState({amount})}
        />

        <View style={{flex: 1}}>
          <TouchableOpacity onPress= {() => this.sendTokens()}>
                <View style = {{backgroundColor: 'orange', alignItems: 'center', 
                                justifyContent: 'center', borderRadius: 30, height: 50, margin: 30}}
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

module.exports = SendTokens;