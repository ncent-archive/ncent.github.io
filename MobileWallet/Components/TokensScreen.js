import React, {Component} from 'react';
import {AppState} from 'react-native';
import {Modal, Button, FlatList, TextInput, StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback  } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {getTokens} from '../Actions';
import {Spinner} from './Common';
import {Icon} from 'react-native-elements';


 
class TokensScreen extends Component {

  state = {
    appState: AppState.currentState
  }

  componentDidMount() {
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
          <TouchableWithoutFeedback onPress={() => Actions.drawerOpen()}>
            <View style={{justifyContent: 'center', paddingLeft: 10}}>
              <Icon
                size={30}
                name='menu'
                color='#4c3e99' />
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.navBarHeader}>Tokens</Text>
          <View style={{justifyContent: 'center', paddingLeft: 10}}>
              <Icon
                size={30}
                name='menu'
                color='#0000' />
            </View>
        </View>
        <View style={{ flex: 1}}>
          <FlatList
              data={this.props.allTokens}
              renderItem={({item}) => 
              <View>
                <TouchableHighlight onPress={() => Actions.TokenDetails({tokenType: item})} underlayColor="white">
                  <View style={{flexDirection: 'row', paddingTop: 30, height: 90}}>
                    <Text style={{paddingLeft: 20, fontSize: 20}}>{item.asset_code || item.asset_type}</Text>
                  </View>
                </TouchableHighlight>
                  <View style={{flexDirection: 'row', paddingTop: 1, height: 1, backgroundColor: "gray"}}>
                  </View>                
              </View>
            }
            keyExtractor={(item) => item.asset_code || item.asset_type}
          />
        </View>
        {this.renderError()}
        <TouchableHighlight onPress={() => Actions.MaitreSignup()} underlayColor="white">
          <View style={styles.bottomBar}>
            <Text style={styles.bottomBarHeader}>Sign Up for Early Access</Text>
          </View>
        </TouchableHighlight>

      </View>
    );
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    paddingTop: 10,
    height: 80,
    backgroundColor: '#5c4da0',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: .2
  },
  bottomBarHeader: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    fontSize: 20,
    paddingTop: 15
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

module.exports = connect(mapStateToProps, {getTokens})(TokensScreen);


