const express= require ('express');
const path= require ('path');
const bp = require('body-parser');
const mongoose= require('mongoose');

const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')


let localhost = process.env.PORT||80;

//mongoose and node database connection
mongoose.connect('mongodb+srv://Yash:adminportal@cluster0.1clzk.mongodb.net/User', { useNewUrlParser: true, useUnifiedTopology: true });
const  db= mongoose.connection;

db.once('open', ()=>{
  console.log('Connected to Database');
});
//error check
db.on('err', ()=>{
  console.log(err);
});

//bringing the schema in 
let Admin = require('./models/rotaractor')
const app = express();

//passport config
  require('./models/passport')(passport); 


app.set('views',path.join(__dirname, 'views') );
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));



//body-parser set up
app.use(express.urlencoded({extended: false}))
app.use(bp.json());

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  // cookie: { maxAge: 60000 }
}));

//passport Middleware
app.use(passport.initialize());
app.use(passport.session());


app.use(flash());
// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


app.use('/', require('./routes/router'));
app.use('/user', require('./routes/users'));




app.listen(localhost , ()=>{
    console.log(`Server started at port ${localhost}....`);
  })



