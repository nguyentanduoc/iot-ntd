module.exports = {
  port: 8081 || process.env.PORT,
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  },
  bcrypt: {
    salt: 8
  }
};
