var User = require('../models/User');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var bcrypt = require('bcrypt-nodejs');

function jwtSigUser(user) {
  const ONE_WERK = 60 * 60 * 27 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WERK
  });
}

module.exports = {
  register(req, res) {
    const {
      name,
      email,
      password
    } = req.body;
    User.findOne({
      email: email
    }, (err, docs) => {
      if (err) {
        res.status(500).json({
          message: err
        });
      } else {
        if (docs) {
          res.status(500).json({
            message: `Tài khoản đã tồn tại`
          });
        } else {
          bcrypt.hash(password, null, null, (err, hash) => {
            if (err) {
              res.status(500).json({
                message: err
              });
            } else {
              var user = new User({
                _id: new mongoose.Types.ObjectId(),
                name: name,
                email: email,
                password: hash,
                is_admin: 2
              });
              user
                .save()
                .then(() => {
                  res.status(201).json({
                    createUser: user
                  });
                })
                .catch(err => {
                  res.status(400).json({
                    message: err
                  });
                });
            }
          });
        }
      }
    });
  },
  login(req, res) {
    try {
      const {
        email,
        password
      } = req.body;
      User.findOne({
        email: email
      }, (err, docs) => {
        if (err) {
          res.status(500).json({
            errpr: err
          });
        } else {
          if (!docs) {
            res.status(403).send({
              error: `Tài khoản không tồn tại!`
            });
          } else {
            bcrypt.compare(password, docs.password, (err, result) => {
              if (err) {
                res.status(403).json({
                  error: err
                });
              } else {
                if (!result) {
                  res.status(403).json({
                    error: `Emai hoặc mật khẩu không đúng!`
                  });
                } else {
                  res.status(201).json({
                    user: docs.toJSON(),
                    token: jwtSigUser(docs.toJSON())
                  });
                }
              }
            });
          }
        }
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Xảy ra lỗi, vui lòng đăng nhập lại!'
      });
    }
  },
  getAllUser(req, res) {
    User.find({
      'status': 1
    }, (err, docs) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      } else {
        return res.status(200).json({
          users: docs
        });
      }
    });
  },
  getUser(req, res) {
    const {
      _id
    } = req.body;
    User.findOne({
      _id: _id
    }, (err, doc) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      } else {
        return res.status(201).json({
          user: doc
        });
      }
    });
  },
  updateUser(req, res) {
    const {
      user
    } = req.body;
    User.updateOne({
      _id: user._id
    }, {
      name: user.name,
      update_date: new Date(),
      status: user.status
    }, (err, docs) => {
      if (err) {
        return res.status(500).json({
          msg: err
        });
      } else {
        return res.status(200).json({
          msg: `Cập nhật thành công`
        });
      }
    });
  },
  restPsw(req, res) {
    const {
      _id
    } = req.body;
    bcrypt.hash('01697914677', null, null, (err, hash) => {
      if (err) {
        return res.status(500).json({
          msg: `Xảy ra lỗi`
        });
      } else {
        User.updateOne({
          _id: _id
        }, {
          password: hash
        }, (err, docs) => {
          if (err) {
            return res.status(500).json({
              msg: `Xảy ra lỗi update`
            });
          } else {
            return res.status(200).json({
              msg: `Cập nhật thành công`
            });
          }
        });
      }
    });
  }
};
