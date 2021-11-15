// Requiring express
const express = require('express');
// App is an express object, has all of the methods now
const app = express();
// Requiring mongoose
const mongoose = require('mongoose');
// Requiring path
const path = require('path');
// Requiring ejs-mate
const ejsMate = require('ejs-mate');


// Express configurations
// So express can interpret ejs
app.set('view engine', 'ejs');
// So express can access the views no matter where you run main
app.set('views', path.join(__dirname, '../assets/views'));
// Will probably come in handy, allows for one to create html partials conveniently
app.engine('ejs', ejsMate);

// Express is listening on port 2000
app.listen(2000, () =>
{
    console.log ("On port 2000");
});

// Routes
// Get route for the home page
app.get('/', (req, res) =>
{
    res.render('index');
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