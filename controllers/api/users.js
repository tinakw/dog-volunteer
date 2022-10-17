const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createJWT = (user) => {
  return jwt.sign(
    { user },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )
}

const create = (req, res) => {
  User.create(req.body, (error, createdUser) => {
    if (error) {
      console.error(error);
      res.status(400).json(error)
    } else {
      const token = createJWT(createdUser);
      res.status(201).json({
        jwt_token: token
      })
    }
  });
}

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.send('Email does not exist');
  }
  console.log('user found', user);
  // Check to see if their password is valid

  const isPasswordMatching = await bcrypt.compare(req.body.password, user.password);



  if (isPasswordMatching) {
    const token = createJWT(user);
    res.status(201).json({
      jwt_token: token
    })
  } else {
    res.status(401).json('Password is invalid')
  }

  // User.create(req.body, (error, createdUser) => {
  //   if (error) {
  //     console.error(error);
  //     res.status(400).json(error)
  //   } else {
  //     const token = createJWT(createdUser);
  //     res.status(201).json({
  //       jwt_token: token
  //     })
  //   }
  // });
}

module.exports = {
  create,
  login
}