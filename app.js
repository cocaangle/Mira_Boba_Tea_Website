require("dotenv").config();
var express = require("express");
var app = express();
var bodyParser= require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var User = require("./models/user");
var flash = require("connect-flash");
var seedDB = require("./seeds");

//requiring routes
var commentRoutes = require("./routes/comments"),
	reviewRoutes = require("./routes/reviews"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");

// mongoose.connect("mongodb://localhost/yelp_camp", {
//  useNewUrlParser: true,
//  useUnifiedTopology: true});

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";

mongoose.connect(url, {
 useNewUrlParser: true,
 useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');
//seedDB();

//passport configuration
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//create a global currentUser variable at first
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);

app.listen(process.env.PORT || 3000, function(){
	console.log("The server has started!");
});