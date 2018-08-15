import firebase from 'firebase';
import {USER_LOGOUT_FROM_SIDEMENU} from './types';
import {Actions} from 'react-native-router-flux';
import ncentSDK from 'ncent-sdk-public';

const ncentSDKInstance = new ncentSDK();


export const signOutFromSideMenu = () => {
	return (dispatch) => {
		//firebase.auth().signOut()
			//.then( () => {
				dispatch({type: USER_LOGOUT_FROM_SIDEMENU});
				Actions.popTo("LoginOrSignup");
			//})
	}
}