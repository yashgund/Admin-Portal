const express= require('express');
const router = express.Router();
let Admin = require('../models/rotaractor');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
// const { models } = require('mongoose');
const {forward, ensure}= require('../models/auth');


router.get('/dashboard', ensure, (req,res)=>{
    res.render('dashboard',{
        user: req.user
    });
});

router.get('/login', (req,res)=>{
    res.render('login');
});

router.get('/create', (req,res)=>{
    res.render('create');
});

// Login
// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/user/login',
//     failureFlash: true
//   })(req, res, next);
// });
router.post('/login', 
  passport.authenticate('local', { 
       failureRedirect: '/user/login',
      failureFlash: true }),
  function(req, res,next) {
    res.redirect('/user/dashboard');
  });



// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/user/login');
});


module.exports= router;
