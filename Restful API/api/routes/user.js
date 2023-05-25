const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user,
        password: hash,
        gender: req.body.gender,
        email: req.body.email,
        userType: req.body.userType,
        phone: req.body.phone
      });
      user.save()
        .then(result => {
          res.status(200).json({
            new_user: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    }
  });
});

router.post('/login', (req, res, next) => {
  const { user, password } = req.body;

  User.findOne({ user })
    .exec()
    .then(foundUser => {
      if (!foundUser) {
        return res.status(401).json({
          msg: 'User does not exist'
        });
      }
      bcrypt.compare(password, foundUser.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            msg: 'Authentication failed'
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              user: foundUser.user,
              userType: foundUser.userType,
              email: foundUser.email,
              phone: foundUser.phone
            },
            'this is dummy text',
            {
              expiresIn: '24h'
            }
          );
          res.status(200).json({
            user: foundUser.user,
            userType: foundUser.userType,
            email: foundUser.email,
            phone: foundUser.phone,
            token: token
          });
        } else {
          res.status(401).json({
            msg: 'Password matching failed'
          });
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
