var Joi = require('joi');

module.exports = {
  register(req, res, next) {
    var schema = {
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    };
    var {
      error
    } = Joi.validate(req.body, schema);
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).json({
            error: 'You must provide a valid email address'
          });
          break;
        case 'password':
          res.status(400).json({
            error: `The password provide`
          });
          break;
        default:
          res.status(400).json({
            error: `Invalid registration infomation` + error
          });
      }
    } else {
      next();
    }
  }
};
