# Setup
Run ```npm install``` to install all of the necessary packages

# Running
1- Make sure that you have ```dev-cent``` running. If you are looking to run it on a testnet, change the variable ```useStellarTestnet``` in ```dev-cent/config.js``` to true. <br/>
2- Whatever the server and the port that ```dev-cent``` daemon is running on, enter them for the variable ```devcentAddress``` in ```index.js```. As of now, the default is ```http://localhost:3000/```. <br/>
3- Make sure that the port in ```index.js``` is not the same as the one in ```dev-cent/config.js```. <br/>
4- Run using the command ```node index.js```. <br/>
