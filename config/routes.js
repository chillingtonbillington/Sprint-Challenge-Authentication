const axios = require('axios');
const { authenticate, tokenGenerator } = require('../auth/aunthenticate');

const bcrypt = require('bcryptjs');
//const cors = require('cors');

const db = require('../database/dbConfig');
//const jwt = require('jsonwebtoken');




module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};


function register(req, res) {
  const newUserCreds = req.body;
  const hashedPass = bcrypt.hashSync(newUserCreds.password, 12);
  newUserCreds.password = hashedPass;
  db('users').insert(newUserCreds)
    .then(ids =>{
        const id = ids[0];
        db('users')
          .where({id})
          .first()
          .then(user => {
            const token = tokenGenerator(user);
            res.status(201).json({user, token})
          })
    })
    .catch(() =>{
      res.status(500).json({message: 'Sorry, could not register new user'})
    })
}

function login(req, res) {
  const userCreds = req.body;
  db('users').where({username: userCreds.username})
    .first()
    .then(user =>{
      if(user && bcrypt.compareSync(userCreds.password, user.password)){
          const token = tokenGenerator(user);
          res.status(200).json({message: 'Successful combination of usename and passcode', token})
      }else{
        res.status(401).json({message: 'Invalid username and passcode'})
      }
    })
    .catch(() =>{
      res.status(500).json({message: 'Sorry, could not log in'})
    })
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
  }