import React, {Component} from 'react';
import {Button, FlatList, TextInput, StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback  } from 'react-native';
import {Actions} from 'react-native-router-flux';

class TokensScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {tokens: this.getAllTokens()};
  }

  logOut() {
    Actions.LoginOrSignup();
  }

  getAllTokens() {
    let tokens = [
                {key: 'nCent'},
                {key: 'fanCent'},
                {key: 'jobCent'},
                {key: 'buildCent'}
              ];
    return tokens;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableWithoutFeedback onPress={() => this.logOut()}>
            <View>
              <Text style={styles.navBarButton}> Log Out</Text>
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.navBarHeader}>Tokens</Text>
          <Text style={styles.navBarButton}></Text>
        </View>
        <View style={{ flex: 1}}>
          <FlatList
              data={this.state.tokens}
              renderItem={({item}) => 
              <View>
                <TouchableHighlight onPress={() => Actions.TokenDetails()}>
                  <View style={{flexDirection: 'row', paddingTop: 30, height: 90}}>
                    <Text style={{paddingLeft: 20, fontSize: 20}}>{item.key}</Text>
                  </View>
                </TouchableHighlight>
                  <View style={{flexDirection: 'row', paddingTop: 1, height: 1, backgroundColor: "gray"}}>
                  </View>                
              </View>
            }
            keyExtractor={(item) => item.key}
          />
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

module.exports = TokensScreen;