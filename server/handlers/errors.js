module.exports.errorMiddleware = function (err, req, res, next) {
  console.log('TODO add proper error handling.');

  if (res.headersSent) {
    return next(err);
  }

  next(err);
};