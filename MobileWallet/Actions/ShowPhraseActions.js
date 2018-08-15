import firebase from 'firebase';
import {SHOW_PHRASE, HIDE_PHRASE} from './types';
import {Actions} from 'react-native-router-flux';
import Expo from 'expo';

export const hidePhrase = () => {
	return (dispatch) => {
		dispatch({type: HIDE_PHRASE});
	};
};

export const showPhrase = () => {

	return (dispatch) => {
		Expo.SecureStore.getItemAsync('mnemonic')
		.then(response => {
			dispatch({type: SHOW_PHRASE, payload: response})
		})
	};
};

