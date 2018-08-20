const AUTH0_CLIENT_ID = 'q0rYmeyqDtZ1S0befLlJjzRr50xAbssK';
const AUTH0_DOMAIN = 'jagadeeshpala.auth0.com';

if (!AUTH0_CLIENT_ID || !AUTH0_DOMAIN) {
    alert('Make sure to set the AUTH0_CLIENT_ID and AUTH0_DOMAIN variables in auth0-variables.js.');
}

const AUTH_CONFIG = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    audience: 'https://' + AUTH0_DOMAIN + '/userinfo',
    scope: 'openid profile',
    responseType: 'token',
    redirectUri: 'http://localhost:3000'
});
