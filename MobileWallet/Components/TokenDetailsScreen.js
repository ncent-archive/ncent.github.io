import React, {Component} from 'react';
import {Alert, Button, FlatList, TextInput, StyleSheet, Text, View,
 TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback  } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {getTokenBalance} from '../Actions';
import {Spinner} from './Common';

 
class TokenDetailsScreen extends Component {

 
  goToSend() {
    // if (this.state.balance <= 0.0) {
    //   Alert.alert("Error", "You don't have any tokens");
    //   return;
    // }
    Actions.SendTokens({tokenType: this.props.tokenType});
    return;
  }

  componentDidMount() {
    this.props.getTokenBalance({tokenType: this.props.tokenType});
  }

  componentWillReceiveProps() {
    // console.log(this.props.loading);
    // if (this.props.loading) {
      this.props.getTokenBalance({tokenType: this.props.tokenType});
    // }
  }

  render() { 
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableWithoutFeedback onPress={() => Actions.pop()}>
            <View>
              <Text style={styles.navBarButton}>Back</Text>
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.navBarHeader}>{this.props.tokenType} Wallet</Text>
          <Text style={styles.navBarButton}></Text>
        </View>
        <View style={styles.balance_content}>
          <Text style={{color: 'white', fontSize: 30}}>
            Balance
          </Text>
          <Text style={{color: 'white', fontSize: 50}}>
            {this.props.balance}
          </Text>
        </View>
        <View style={{flex: 2}}>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress= {() => this.goToSend()}>
                  <View style = {{backgroundColor: '#6D6792', alignItems: 'center', 
                                  justifyContent: 'center', borderRadius: 30, height: 50, margin: 30}}
                         >
                         <Text style={{color:'white', fontSize: 20}}> New Transaction </Text>
                  </View>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <Text style={{textAlign: 'center'}}> Transaction History Unavailable </Text>
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
    paddingTop: 10,
    height: 70, //64
    backgroundColor: '#6D6792'
  },
  navBarHeader: {
    flex: 1,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 25,
    fontSize: 20,
  },
  navBarButton: {
    color: '#FFFFFF',
    textAlign:'center',
    paddingTop: 25,
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
    backgroundColor: '#374046' //#374046
  },
  text: {
    color: '#EEEEEE'
  },
});

const mapStateToProps = (state) => {
  const {balance, error, loading} = state.tokenDetails;
  return {balance, error, loading};
}

module.exports = connect(mapStateToProps, {getTokenBalance})(TokenDetailsScreen);
