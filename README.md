change the credential in the index.js file eg below

 const credentials = [
        { email: 'priyanshu9836@gmail.com', password: '123456' ,isCredentialCorrect: true},
        { email: 'priyanshu9836@gmail.com', password: '123' ,isCredentialCorrect: false},]

isCredentialCorrect >> reffers if the credential is correct or not 
currently no support for the wrong email or unregisterd email it will lead to failure

to run the program 
//in local
start the server (service) //wrappid-service
start the frontend (web)  //wrappid-app (on port 3000)

go the root of this project and run 
node index.js


to run the program 
//for the hosted app 
change the url in the index.js file only
looks something like this >> await driver.get('http://localhost:3000');
run node index.js in the root of the project
