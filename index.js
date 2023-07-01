const express=require('express');
const app=express();
const mongoose=require('mongoose');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
require('dotenv').config();

mongoose.connect(process.env.DB_URI)
.then(()=>{
    console.log("DB Connected Successfully.");
})
.catch((error)=>{
    console.log(error);
})

// ! Session setup
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
			// secure: true,
			maxAge: 1000 * 60 * 60 * 24 * 2
		}
	})
);

//!Server Setup

app.use(flash());

app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//! Middlewares
app.use((req, res, next) => {
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	// res.locals.currentUser = req.user;
	next();
});

const hotelRoutes=require('./routes/hotels');
app.use(hotelRoutes);

app.listen(process.env.PORT,()=>{
    console.log('Server is running on port 3000');
})
