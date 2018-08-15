import React, {Component} from 'react';
import {Alert, Button, FlatList, TextInput, StyleSheet, Text, View,
 TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback  } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {userUpdate, createUser} from '../Actions';
import {Spinner} from './Common';

 
class NameSignup extends Component {
 


  renderContinueButton() {
  	if (this.props.first.length > 1 && this.props.last.length > 1) {
  		return (
  			<TouchableOpacity onPress={()=>Actions.EmailSignup()}>
              <View style = {{backgroundColor: '#5c4da0', alignItems: 'center', 
                              justifyContent: 'center', borderRadius: 30, paddingRight: 50, paddingLeft: 50, height: 50, margin: 0, marginTop: 0}}
                     >
                     <Text style={{color:'white', fontSize: 25}}> Continue </Text>
              </View>
          	</TouchableOpacity>
  		)
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



  renderInputForm() {
    if (this.props.loading) {
      return <Spinner size="large"/>;
    }
    return (
      <View style = {{margin: 10, marginTop: 30}}>
            <TextInput
              autoCorrect= {false}
              style={{height: 60, paddingLeft: 30, fontSize: 22, backgroundColor: '#F8F8F8'}}
              placeholder="First"
              value={this.props.first}
              onChangeText={(text) => this.props.userUpdate({prop:'first', value: text})}
            />
            <View style={{ height: 8}} />
            <TextInput
              autoCorrect= {false}
              style={{height: 60, paddingLeft: 30, fontSize: 22, backgroundColor: '#F8F8F8'}}
              placeholder="Last"
              value={this.props.last}
              onChangeText={(text) => this.props.userUpdate({prop:'last', value: text})}
            />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableWithoutFeedback >
            <View>
              <Text style={styles.navBarButton}>Back</Text>
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.navBarHeader}>Please Enter Your Name</Text>
          <TouchableWithoutFeedback >
            <View>
              <Text style={styles.navBarButton}></Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        {this.renderInputForm()}

        <View style={styles.content}>
          {this.renderError()}
          {this.renderContinueButton()}
          
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
    marginTop: 0,
    fontSize: 18,
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
  content: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 0
  }
});

const mapStateToProps = (state) => {
  const {first, last, email, username, phone, pin, confirm, error, loading} = state.signup;
  return {first, last, email, username, phone, pin, confirm, error, loading};
}

module.exports = connect(mapStateToProps, {userUpdate})(NameSignup);

