const axios = require('axios');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);
const jwt = require('jsonwebtoken');
const { authenticate } = require('./middlewares');

const secret = 'I want a girl with a short skirt and a looooooooooooooooooooooooooooooooooooong secret!'

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};
function tokenGenerator(username){
  const payload ={
    username
  }
  const options = {
    expiresIn : '1h'
  }
  return jwt.sign(payload,secret,options)
}


function register(req, res) {
  const newUserCreds = req.body;
  const hashedPass = bcrypt.hashSync(newUserCreds.password, 12);
  newUserCreds.password = hashedPass;
  db('users').insert(newUserCreds)
    .then(ids =>{
        res.status(201).json(ids)
    })
    .catch(() =>{
      res.status(500).json({message: 'Sorry, could not register new user'})
    })
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  axios
    .get('https://safe-falls-22549.herokuapp.com/random_ten')
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
