const logger = (req, res, next) => {
    req.message = "Added Middleware";
    console.log(`${req.method} ${req.protocol} :// ${req.get('host')} ${req.originalUrl}`);
    next();
}

module.exports = logger;