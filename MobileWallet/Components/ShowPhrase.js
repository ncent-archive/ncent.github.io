import React, {Component} from 'react';
import {Alert, Button, FlatList, TextInput, StyleSheet, Text, View,
 TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback,
 AppState  } from 'react-native';
import {connect} from 'react-redux';
import {hidePhrase, showPhrase} from '../Actions';
import {Spinner} from './Common';
import {Actions} from 'react-native-router-flux';
import {Icon} from 'react-native-elements';

 
class ShowPhrase extends Component {


  hidePhraseButton() {
  	this.props.hidePhrase();
  }
  showPhraseButton(){
    this.props.showPhrase();
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

  renderPhrase() {
    if (this.props.phraseVisible) {
      return (
        <View style={{margin: 30, marginTop: 20, marginBottom: 10}}>
          <Text style = {styles.phrase}>
            {this.props.phrase}
          </Text>
        </View>
      )
    }
    else  {
      return (
        <View style={{margin: 30, marginTop: 20, marginBottom: 10}}>
          <Text style = {styles.informationTextBold}>
            What is a recovery phrase?
          </Text>
          <Text style = {styles.informationText}>
            The nCent Mobile Wallet securely stores all your private information on your phone.
            This way, only you ever have access to your keys.
          </Text>
          <Text style = {styles.informationText}>
            If you delete the app or lose your phone though, you lose your keys.
            You can securely recover your wallet keys from a 12 word seed phrase we generate specifically for you.
          </Text>
          <Text style = {styles.informationTextBold}>
            Make sure you write your phrase down somewhere safe where only you can access it.
          </Text>
        </View>
      );
    }
  }

  renderShowButton() {
  	 if (this.props.phraseVisible) {
      return (
        <TouchableOpacity onPress= {this.hidePhraseButton.bind(this)}>
              <View style = {{backgroundColor: '#5c4da0', alignItems: 'center', 
                              justifyContent: 'center', borderRadius: 30, height: 50, margin: 70, marginTop: 30}}
                     >
                     <Text style={{color:'white', fontSize: 25}}> Hide My Phrase </Text>
              </View>
        </TouchableOpacity>
        );
    }
     else return (
     	<TouchableOpacity onPress= {this.showPhraseButton.bind(this)}>
              <View style = {{backgroundColor: '#5c4da0', alignItems: 'center', 
                              justifyContent: 'center', borderRadius: 30, height: 50, margin: 70, marginTop: 30}}
                     >
                     <Text style={{color:'white', fontSize: 25}}> Show My Phrase </Text>
              </View>
        </TouchableOpacity>
       );
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
          <Text style={styles.navBarHeader}>Recovery Phrase</Text>
          <View style={{justifyContent: 'center', paddingLeft: 10}}>
              <Icon
                size={30}
                name='menu'
                color='#0000' />
          </View>
        </View>
        {this.renderPhrase()}
        {this.renderError()}
        {this.renderShowButton()}
        

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
  phrase: {
    marginTop: 30,
    fontSize: 35,
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black'
    //color: '#5c4da0'
  },
  informationText: {
    marginTop: 30,
    fontSize: 17,
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black'
    //color: '#5c4da0'
  },
  informationTextBold: {
  	fontWeight: 'bold',
    marginTop: 30,
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
  const { error, success, loading, phraseVisible, phrase} = state.phrase;
  return { error, success, loading, phraseVisible, phrase};

};

module.exports = connect(mapStateToProps, 
  {hidePhrase, showPhrase})(ShowPhrase);
