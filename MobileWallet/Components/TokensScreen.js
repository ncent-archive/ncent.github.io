import React, {Component} from 'react';
import {Button, FlatList, TextInput, StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback  } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {getTokens, signOut} from '../Actions';
import {Spinner} from './Common';

class TokensScreen extends Component {

  logOut() {
    this.props.signOut();
  }


  componentWillMount() {
    this.props.getTokens();
  }

  renderError() {
    if (this.props.error) {
      return (
        <View> 
          <Text>
            {this.props.error}
          </Text>
        </View>
      );   
    }
    return;
  }
 
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
              data={this.props.allTokens}
              renderItem={({item}) => 
              <View>
                <TouchableHighlight onPress={() => Actions.TokenDetails({tokenType: item.tokentype_uuid})} underlayColor="white">
                  <View style={{flexDirection: 'row', paddingTop: 30, height: 90}}>
                    <Text style={{paddingLeft: 20, fontSize: 20}}>{item.tokentype_uuid}</Text>
                  </View>
                </TouchableHighlight>
                  <View style={{flexDirection: 'row', paddingTop: 1, height: 1, backgroundColor: "gray"}}>
                  </View>                
              </View>
            }
            keyExtractor={(item) => item.tokentype_uuid}
          />
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



const mapStateToProps = (state) => {
  const {error, loading, allTokens} = state.tokens;
  return {error, loading, allTokens};
}

module.exports = connect(mapStateToProps, {getTokens, signOut})(TokensScreen);


