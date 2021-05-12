# Final Year Project

##### Gustavo Zapata - K1715308  
##### Computer Science - Kingston University London  

## Technologies & Tools
 - Node.js
 - Express.js
 - MongoDB
 - Mongoose ODM

## Install
 - Make sure node and npm are installed
 - Open the terminal/command prompt and 'cd' into this folder
 - $ npm install
 - Create a file called .env
 - Add the following environment variables
 - Enter the missing env variables

 ```js
PORT=4000
NODE_ENV=development
LOCAL_HOST=
DB_URI_LOCAL=
DB_URI=
DB_PASSWORD=
STRIPE_SECRET_KEY=
 ```

## Run
 - Once the packages have been installed
 - $ npm start
 - This will run the server application

### Development
 - These command are useful when running this app from a Linux Ubuntu environment
 - Make sure mongodb and pm2 are installed 
 - Start MongoDB on Ubuntu: sudo systemctl start mongod
 - Start server watch mode: pm2 start server --watch 