const User = require("../models/user");

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

        const user = new User({email, username});
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

module.exports.renderRegForm = renderRegForm;
module.exports.renderLoginForm = renderLoginForm;
module.exports.register = register;
module.exports.loginMessage = loginMessage;
module.exports.logout = logout;