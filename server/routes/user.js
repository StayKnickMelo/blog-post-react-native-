const express = require('express');
const { validationResult, check } = require('express-validator');
const router = express.Router();
const User = require('../model/User');
const { protect } = require('../middleware/auth');


// @route POST /auth/register
// @desc REGISTER user
// @access public
router.post('/register', [
  check('name', 'Plase add a name').not().isEmpty(),
  check('email', 'Please include a valid Email').isEmail(),
  check('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
], async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    })
  };

  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({
        success: false,
        error: 'Email Alredy Taken'
      })
    };

    user = await User.create(req.body);

    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      token
    })

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }

});

// @route POST /auth/login
// @desc Login user
// @access public
router.post('/login', [
  check('email', 'Please use a valid email').isEmail(),
  check('password', 'Please provide a password').not().isEmpty()
], async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    })
  }

  try {
    const user = await User.findOne({ email: req.body.email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid Credentianls'
      })
    }

    const isMatch = await user.matchPassword(req.body.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid Credentials'
      })
    };


    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token
    })

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      error: 'Server Error'
    })

  }

});


// @route GET /auth/me
// @desc  get a user
// @access private
router.get('/me', protect, (req, res) => {

  res.status(200).json({
    success: true,
    user: req.user
  });
});









module.exports = router;