const maxDuration = (req, res, next) => {
    if (req.query.max_duration > process.env.MAX_DURATION) {
        res.status(500).json('please request less than 3600 seconds');
    } else {
        next();
    }
};

module.exports = { maxDuration };
