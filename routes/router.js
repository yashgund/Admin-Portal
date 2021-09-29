const express = require('express');
const route = express.Router();
let Admin = require('../models/rotaractor');
const flash = require('connect-flash');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const passport = require('passport');
// const flash1 = require('express-flash');
const {forward, ensure}= require('../models/auth');


//all get requests

route.get('/',  (req, res) => {
    res.render('index');
});

route.get('/register', forward, (req, res) => {
    // res.flash('Welcome', 'success');
    res.render('register');
});


route.get('/edit/:id', ensure, (req, res) => {
    Admin.findById(req.params.id, (err, Rtr) => {
        res.render('edit_info', {
            RtrList:Rtr
        });
    })
});

route.get('/profiles', forward , (req, res) => {
    Admin.find({}, (err, Rtr) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('profiles', {
                RtrList: Rtr
            });

        }
    });

});
route.get('/:id', forward, (req, res) => {
    Admin.findById(req.params.id, (err, Rtr) => {

        res.render('profile', {
            RtrList: Rtr

        });
    })

});




//Post requests
route.post('/register',  (req, res) => {
    const { name, email, password } = req.body;
    let errors = [];
    
    Admin.findOne({email:email }).then(
        user=>{
            if(user){
                res.redirect('/register')
                console.log('User already exist, try logging in');
                req.flash('error_msg', 'User already exists');
            
            }
            else {
                let Rtr = new Admin(req.body);
                var salt = bcrypt.genSaltSync(10);                                               
                Rtr.password = bcrypt.hashSync(Rtr.password, salt);
            
                Rtr.save()
                .then(user=>{
                    req.flash('success_msg', 'You can now login')
                    res.redirect('/user/login');
                    console.log('Data saved');

                })
                .catch(err=>{
                    console.log(err);
                })

            }
        }
    )

   

   



});


// route.post('/register', (req, res)=>{
//     let Rtr= new Admin();
//     Rtr.name = req.body.name;
//     Rtr.email = req.body.email;
//     Rtr.password = req.body.password;
//     Rtr.password2 = req.body.password2;

//     Rtr.save((err)=>{
//       if(err){
//         console.log(err);
//         return;
//       }else{

//         res.redirect('/profiles');
//       }
//     });
// });

//loading the edit page
route.post('/edit/:id', (req, res) => {
    let Rtr = {};
    Rtr.name = req.body.name;
    Rtr.post = req.body.post;
    Rtr.email = req.body.email;
    Rtr.number = req.body.number;
    Rtr.phnumber = req.body.phnumber;
    Rtr.department = req.body.department;
    Rtr.address = req.body.address;

    let filter = { _id: req.params.id }

    Admin.update(filter, Rtr, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        else {
            req.flash('Success', 'Details updated');
            res.redirect('/profiles');
        }
    })

});


//delete req
route.delete('/:id', (req, res) => {

    let filtery = { _id: req.params.id };
    Admin.findById(req.params.id, function (err, Rtr) {
        Admin.remove(filter, (err) => {
            if (err) {
                console.log(err);
            }
            res.send('Success')
        });
    })
});

route.get('/delete/:id', (req, res) => {
    let filter = { _id: req.params.id };

    Admin.findByIdAndRemove(filter, (err, Rtr) => {
        if (err) {
            console.log(err);
            return;
        }
        else {
            res.redirect('/profiles');
        }
    })
})



module.exports = route;