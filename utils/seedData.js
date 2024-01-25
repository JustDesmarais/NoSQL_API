// import schema models
const { User } = require('../models/index');
const db = require('../config/connection');
const express =  require('express');

// faker is a dev dependency to seed the db with fake data
const { faker } = require('@faker-js/faker');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const generateUsers = (num) => {
    const user = [];
  
    for (let i = 0; i < num; i++) {
      const username = faker.internet.userName()
      const email = faker.internet.email();
  
      user.push({
        username,
        email,
      });
    }
  
    return user;
};

const users = generateUsers(15);

db.once('open', async () => {
    app.listen(PORT, () => {
        console.log(`API server running on Port ${PORT}!`)
    })
})

User.insertMany(users)
.then(docs => console.log(`${docs.length} users have been inserted into the database.`))
.catch(err => {
console.error(err);
console.error(`${err.writeErrors?.length ?? 0} errors occurred during the insertMany operation.`);
});