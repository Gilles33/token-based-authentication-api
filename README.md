# token based authentication based on JWT
Example of token based authentication API using jsonwebtoken package, bearer token and express.js with mongoose.

## Usage
1. clone the repo
2. install dependencies : ```npm install```
3. create a file db.js to connect the api with mongoDB
4. create a file app-env and add ```export SECRET='thisIsMySecretPassPhrase'```
5. on terminal : ```source app-env```
6. run the server ```node index.js```
7. create a user with postman or insomnia : ```http://localhost:8000/register```
8. use the token on header from response to make request to ```http://localhost:8000/users```

```Authorization : Bearer yourTokenHere```
