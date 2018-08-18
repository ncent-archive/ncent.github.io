import React, {Component} from 'react';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './Reducers';
import RootStack from './Components/Navigation.js';




export default class App extends React.Component {
  componentWillMount() {
    const config = {
      apiKey: "firebaseKey",
      authDomain: "walletaccounts.firebaseapp.com",
      databaseURL: "https://walletaccounts.firebaseio.com",
      projectId: "walletaccounts",
      storageBucket: "",
      messagingSenderId: "700254836520"
    };

    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}

