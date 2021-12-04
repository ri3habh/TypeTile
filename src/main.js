const express = require('express');
const app = express();

const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const textgen = require('txtgen');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const PassportLocal = require('passport-local');
const userRoutes = require('../assets/routes/users');
const User = require('../assets/models/user');
const ExpressError = require('../assets/error-handling/ExpressError');
const { isLoggedIn } = require('../assets/middleware');
const asyncWrapper = require('../assets/error-handling/asyncWrapper');
const Leaderboard = require('../assets/models/leaderboard');

// If not deployed to heroku, make environment variables accessible
if (process.env.NODE_ENV !== 'production')
{
    require('dotenv').config();
}

// Express configurations
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../assets/views'));
app.engine('ejs', ejsMate);

// Middleware
// Sets express to looks for static files in the static directory
app.use(express.static(path.join(__dirname, '../assets/static')));
app.use(express.urlencoded( { extended: true }));
app.use(session(
    { 
        secret: 'secretKey', 
        resave: false, 
        saveUninitialized: true,
        cookie: 
        {
            name: 'session',
            httpOnly: true,
            expires: Date.now() + 1000*3600*24,
            maxAge: 1000*3600*24
        }
    }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new PassportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Add flash messages and the current user onto the session for each request
app.use((req, res, next) =>
{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
});


// Connect to mongodb
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl)
    .then(() =>
    {
        console.log("Successfully connected");
    })
    .catch((e) =>
    {

        console.log('Error in connecting to database');
        console.log(e);
    });

// Express is listening on port 2000
app.listen(2000, () =>
{
    console.log ("On port 2000");
});

// Routes
// Get route for the home page
app.get('/', (req, res) =>
{
    res.render('home');
});
// Get route for the play game page
app.get('/play', isLoggedIn, (req, res) =>
{
    res.render('play');
});
// Get route for the settings page
app.get('/settings', (req, res) =>
{
    res.render('settings');
});
 // Get route for the leaderboard
app.get('/leaderboard', asyncWrapper(async (req, res) =>
{
    let topTenNormal = [], topTenNormalPoison = [], topTenRandom = [], topTenRandomPoison = [];
    const normalLeaderboard = await Leaderboard.findOne({ name: 'normal' }).populate(
        {
            path: 'usersAndScores',
            populate:
            {
                path: 'user'
            }
        }
    );
    if (normalLeaderboard)
    { 
        topTenNormal = normalLeaderboard.usersAndScores.slice(0, 9);
    }
    const normalPoisonLeaderboard = await Leaderboard.findOne({ name: 'normalPoison' }).populate(
        {
            path: 'usersAndScores',
            populate:
            {
                path: 'user'
            }
        }
    );
    if (normalPoisonLeaderboard) 
    { 
        topTenNormalPoison = normalPoisonLeaderboard.usersAndScores.slice(0, 9);
    }
    const randomLeaderboard = await Leaderboard.findOne({ name: 'random' }).populate(
        {
            path: 'usersAndScores',
            populate:
            {
                path: 'user'
            }
        }
    );
    if (randomLeaderboard) 
    { 
        topTenRandom = randomLeaderboard.usersAndScores.slice(0, 9);
    }
    const randomPoisonLeaderboard = await Leaderboard.findOne({ name: 'randomPoison' }).populate(
        {
            path: 'usersAndScores',
            populate:
            {
                path: 'user'
            }
        }
    );
    if (randomPoisonLeaderboard)
    { 
        topTenRandomPoison = randomPoisonLeaderboard.usersAndScores.slice(0, 9);
    }
    res.render('leaderboard', { topTenNormal, topTenNormalPoison, topTenRandom, topTenRandomPoison });
}));
// Get route for all game modes
app.get('/game', (req, res) =>
{
    const { mode, poison } = req.query;
    res.render('game', { randSentences: generateRandomSentences(100), mode, poison });
});
// All user routes
app.use('/', userRoutes);

// If you didn't hit any of the routes, generate a 404 error
app.all('*', (req, res, next) =>
{
    next(new ExpressError('Page Not Found', 404));
});
// Final error handler
app.use((err, req, res, next) =>
{
    const { statusCode = 500 } = err;
    if (!err.message) { err.message = 'Something went wrong' }
    res.status(statusCode).render('error', { err });
});


/*
HELPER FUNCTIONS
*/
const generateRandomSentences = (n) => {
    const randSentences = [];
    for (let i = 0; i < n; i++)
    {
        randSentences.push(textgen.sentence());
    }
    return randSentences;
};
const quickSortByScore = users =>
{
    if (!users.length)
    {
        return [];
    }
    let pivot = users.highScore;
    let less = users.filter(elem => { elem.highScore < pivot });
    let greater = users.filter(elem => { elem.highScore >= pivot });

    return [].concat(quickSortByScore(less), pivot, quickSortByScore(greater));
}