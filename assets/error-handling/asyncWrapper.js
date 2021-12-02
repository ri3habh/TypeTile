// Apply the passed function and catch any errors
const asyncWrapper = function(asyncFunc)
{
    return (req, res, next) =>
    {
        asyncFunc(req, res, next).catch(next);
    };
};

module.exports = asyncWrapper;