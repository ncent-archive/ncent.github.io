
let medium = require('medium-sdk');

let client = new medium.MediumClient({
  clientId: 'e4a574afdc',
  clientSecret: '3fd4164e942c1aa69d6cf35cf514c68f6e527df3'
});

//console.log("client " + client);
let redirectURL = 'https://ncent.io/Applications/blog/blog.html'; 
//console.log(medium.Scope);
let url = client.getAuthorizationUrl('secretState', redirectURL, [
  medium.Scope.BASIC_PROFILE, medium.Scope.LIST_PUBLICATIONS]);
//console.log(url);
let userid;
let publications;

let token = {	token_type: 'Bearer',
  				access_token: '2352bd9346e0674942a5add80a181db150212c1228ec1ff358cfbfc33e67d8497',
 				refresh_token: '231b0b27458f7d65b3dcaf2540fd9829c2f757795ba665b8db48925e21c35c3e8',
  				scope: [ 'basicProfile', 'listPublications' ],
  				expires_at: 1537718624008
  			};

client.setAccessToken(token);
client.getUser(
	function(err, user){
		console.log(user);
		publications = client.getPublicationsForUser( {
				userId: user.id
				}, 
				function(err, post){
					console.log(token, user, post);
				})
	});
  console.log(publications);

// client.exchangeAuthorizationCode('28f20d93efe6', redirectURL, function(err, token){
// 	console.log(token);
// 	client.getUser(function(err, user){
// 		publications = client.getPublicationsForUser( {
// 			userId: user.id
// 			}, function(err, post){
// 				console.log(token, user, post);
// 		})
// 	})
// });


//console.log(publications);
// return new Promise(function(resolve, reject){
// 		client.getUser(callback);
// 		console.log("in promise");
// 	})
// 	.then(function(response){
// 		console.log("in .then");
// 		userid = response.data.id;
// 	})
// 	.catch(function(error){
// 		console.log("in .catch");
// 		console.log(error);
// 		return;
// 	});
// function callback(){

// }

// console.log(userid);

// console.log(publications);
