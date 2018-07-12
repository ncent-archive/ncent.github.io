import React, {Component} from 'react';
import {Alert, Button, FlatList, TextInput, StyleSheet, Text, View,
 TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback  } from 'react-native';


class TokenDetailsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: '', 
      amount: '', 
      balance: this.getBalance(), 
      tokenName: this.props.navigation.getParam('tokenName', 'Token')
    };
  }

  getBalance() {
    return 0.0;
  }

  goToSend() {
    // if (this.state.balance <= 0.0) {
    //   Alert.alert("Error", "You don't have any tokens");
    //   return;
    // }
    this.props.navigation.navigate('SendTokens', {tokenName: this.state.tokenName});
    return;
  }

  render() {
    const {navigation} = this.props;
    const tokenName = navigation.getParam('tokenName', 'Token');
    const sendTitle = "SEND " + tokenName;
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Home')}>
            <View>
              <Text style={styles.navBarButton}>Back</Text>
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.navBarHeader}>{tokenName} Wallet</Text>
          <Text style={styles.navBarButton}></Text>
        </View>
        <View style={styles.balance_content}>
          <Text style={{color: 'white', fontSize: 30}}>
            Balance
          </Text>
          <Text style={{color: 'white', fontSize: 50}}>
            {this.state.balance}
          </Text>
        </View>
        <View style={{flex: 2}}>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress= {() => this.goToSend()}>
                  <View style = {{backgroundColor: 'orange', alignItems: 'center', 
                                  justifyContent: 'center', borderRadius: 30, height: 50, margin: 30}}
                         >
                         <Text style={{color:'white', fontSize: 20}}> Send </Text>
                  </View>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <Text style={{textAlign: 'center'}}> No Transaction History </Text>
          </View>
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

module.exports = TokenDetailsScreen;