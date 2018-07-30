import firebase from 'firebase';
import {MAITRE_EMAIL_CHANGED, MAITRE_SIGNUP_SUCCESS, MAITRE_SIGNUP_FAIL, MAITRE_SIGNUP_SUBMIT} from './types';
import {Actions} from 'react-native-router-flux';

export const maitreEmailChanged = (text) => {
	return {
		type: MAITRE_EMAIL_CHANGED,
		payload: text
	};
};
 
export const maitreSubscribe = ({email}) => {
	console.log("trying to subscribe");
	const uuid = 'MFfa1aa24de7'
	const base_url = "https://maitreapp.co/api/v2/lists/"+ uuid +"/subscribers";
	const payload = {
	  api_token: "7bbdaa015d9c6025586a48f1603ab333b6fc458a",
	  hosting_url: "https://ncent.io/",
	  email: email
	};


	return (dispatch) => {
		dispatch({type: MAITRE_SIGNUP_SUBMIT});
		fetch(base_url, {
		method: 'POST',
		headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(payload),
		})
		.then((response) => {
			if (response.status === 200) {
				console.log("success");
				dispatch({type: MAITRE_SIGNUP_SUCCESS});
			}
			else {
				dispatch({type: MAITRE_SIGNUP_FAIL});
			}
		})

		

		// maitre api calls


	};
};
