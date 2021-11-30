// Requiring express and executing it
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const textgen = require('txtgen');

const generate50RandomSentences = () => {
    const randSentences = [];
    for (let i = 0; i < 50; i++)
    {
        randSentences.push(textgen.sentence());
    }
    return randSentences;
}

// Express configurations
// So express can interpret ejs
app.set('view engine', 'ejs');
// So express can access the views no matter where you run main
app.set('views', path.join(__dirname, '../assets/views'));
// Will probably come in handy, allows for one to create html partials conveniently
app.engine('ejs', ejsMate);

// Middleware
// Sets express to looks for static files in the static directory
app.use(express.static(path.join(__dirname, '../assets/static')));

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
app.get('/play', (req, res) =>
{
    res.render('play');
})
// Get route for the settings page
app.get('/settings', (req, res) =>
{
    res.render('settings');
});
 // Get route for the leaderboard
app.get('/leaderboard', (req, res) =>
{
    res.render('leaderboard');
});
// Get route for all game modes
app.get('/game', (req, res) =>
{
    const { mode, poison } = req.query;
    res.render('game', { randSentences: generate50RandomSentences(), mode, poison });
});