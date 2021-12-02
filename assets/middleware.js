// Checks if a user is logged in, we get .isAuthenticated() from passport
const isLoggedIn = (req, res, next) =>
{
    if (!req.isAuthenticated())
    {
        req.flash('error', 'Please login');
        return res.redirect('/login');
    }
    next();
}

// Exports
module.exports.isLoggedIn = isLoggedIn;