#!/bin/node
const bcrypt = require('bcrypt');

const password = 'password';
const saltRounds = 10; // Adjust this value based on security requirements

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error(err);
  } else {
    console.log(hash);
  }
});
