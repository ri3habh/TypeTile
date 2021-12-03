const User = require("../models/user");
const Leaderboard = require('../models/leaderboard');

// Render the registration form
const renderRegForm = (req, res) =>
{
    res.render('users/register');
};
// Render the login form
const renderLoginForm = (req, res) =>
{
    res.render('users/login');
};
// Register a user
const register = async (req, res, next) =>
{
    try 
    {
        const { username, email, password } = req.body;

        const user = new User(
            {
                email,
                username,
                normalScores:
                {
                    scores: [],
                    highScore: 0
                },
                normalPoisonScores:
                {
                    scores: [],
                    highScore: 0
                },
                randomScores:
                {
                    scores: [],
                    highScore: 0
                },
                randomPoisonScores:
                {
                    scores: [],
                    highScore: 0
                }
            }
        );
        // We have .register() from passport, will save the user to mongo using mongoose
        const registeredUser = await User.register(user, password);
        // We have .login() from passport, will insert the user into the session
        req.login(registeredUser, err =>
            {
                if (err) { return next(err) }
                req.flash('success', 'New user created');
                res.redirect('/play');
            });
    }
    catch(e)
    {
        req.flash('error', e.message);
        res.redirect('register');
    }
};
// Display a login message
const loginMessage = (req, res) =>
{
    req.flash('success', 'Welcome back');
    res.redirect('/play');
};
// Log out a user
const logout = (req, res) =>
{
    // .logout() is from passport
    req.logout();
    req.flash('success', 'Goodbye');
    res.redirect('/');
};
// Update a user
const updateUser = async (req, res) =>
{
    const id = req.params.id;
    const { score, mode, poison }  = req.body;
    const user = await User.findById(id);
    if (mode === 'normal' && poison !== 'poison')
    {
        let leaderboard = await Leaderboard.find({ name: 'normal'});
        if (!leaderboard.length)
        {
            leaderboard = new Leaderboard(
            {
                name: 'normal',
                usersAndScores: []
            });
        }
        leaderboard.usersAndScores.push({ user, score });
        leaderboard.usersAndScores.sort((userScore1, userScore2) => (userScore1.score < userScore2.score ? 1 : -1));
        await leaderboard.save();
        if (score > user.normalScores.highScore)
        {
            user.normalScores.highScore = score;
        }
    } else if (mode === 'normal')
    {
        let leaderboard = await Leaderboard.find({ name: 'normalPoison'});
        if (!leaderboard.length)
        {
            leaderboard = new Leaderboard(
            {
                name: 'normalPoison',
                usersAndScores: []
            });
        }
        leaderboard.usersAndScores.push({ user, score });
        leaderboard.usersAndScores.sort((userScore1, userScore2) => (userScore1.score < userScore2.score ? 1 : -1));
        await leaderboard.save();
        if (score > user.normalPoisonScores.highScore)
        {
            user.normalPoisonScores.highScore = score;
        }
    } else if (mode === 'random' && poison !== 'poison')
    {
        let leaderboard = await Leaderboard.find({ name: 'random'});
        if (!leaderboard.length)
        {
            leaderboard = new Leaderboard(
            {
                name: 'random',
                usersAndScores: []
            });
        }
        leaderboard.usersAndScores.push({ user, score });
        leaderboard.usersAndScores.sort((userScore1, userScore2) => (userScore1.score < userScore2.score ? 1 : -1));
        await leaderboard.save();
        if (score > user.randomScores.highScore)
        {
            user.randomScores.highScore = score;
        }
    } else if (mode === 'random')
    {
        let leaderboard = await Leaderboard.find({ name: 'randomPoison'});
        if (!leaderboard.length)
        {
            leaderboard = new Leaderboard(
            {
                name: 'randomPoison',
                usersAndScores: []
            });
        }
        leaderboard.usersAndScores.push({ user, score });
        leaderboard.usersAndScores.sort((userScore1, userScore2) => (userScore1.score < userScore2.score ? 1 : -1));
        await leaderboard.save();
        if (score > user.randomPoisonScores.highScore)
        {
            user.randomPoisonScores.highScore = score;
        }
    }
    
    await user.save();
    req.flash('success', 'Successfully updated scores');
    res.redirect('/play');
};
// Render the profile page
const renderProfilePage = async (req, res) =>
{
    const id = req.params.id;
    const user = await User.findById(id);
    res.render('users/profile', { user });
}

module.exports.renderRegForm = renderRegForm;
module.exports.renderLoginForm = renderLoginForm;
module.exports.register = register;
module.exports.loginMessage = loginMessage;
module.exports.logout = logout;
module.exports.updateUser = updateUser;
module.exports.renderProfilePage = renderProfilePage;