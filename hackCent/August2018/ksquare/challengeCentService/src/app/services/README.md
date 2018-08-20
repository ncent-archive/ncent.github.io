# Services


## AuthenticationService
This service handles signup, login, forgotten passwords, etc.



### Deployment for Authentication

#### For Local Deployment
Insure you've installed mongodb and Node.js
1. Windows
   1. visit https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#get-mongodb-community-edition
   2. follow instructions to install mongo.
   3. follow instructions to configure mongo environment (local)
   4. First run: Allow access
       ![AllowAccessDialog](../../../wiki_src/images/MongoDAllowAccess.jpg)
   5. Run `npm start run:win` to start the windows build
2. Mac
   1.visit: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/#install-mongodb-community-edition-with-homebrew
   2. follow instructions to install mongo
   3. follow instructions to configure mongo environment (local)
   4. Run `npm run start` to start the mac build

#### Requirements
1. express
2. mongodb
3. mongoose
4. jsonwebtoken
5. crypto
6. bcrypt-nodejs
7. passport
8. passport-jwt
9. passport-local

You can find all these packages through the node package manager (npm) - https://www.npmjs.com/

#### Steps
1. Setup MongoDB - https://docs.mongodb.com/manual/administration/install-community/
2. Setup Node (current version) - https://nodejs.org/en/
3. Run `$ npm i`
4. All packages should install and be ready for application start.
