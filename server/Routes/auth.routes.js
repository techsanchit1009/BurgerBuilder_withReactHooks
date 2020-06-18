const router = require('express').Router();
const passport = require('passport');


router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/auth/google/redirect', passport.authenticate('google', {
  successRedirect: 'http://localhost:3000/',
  failureRedirect:'http://localhost:3000/auth'
}));

router.get('/auth/user', (req, res) => {
  res.status(200).json({
    cookie: req.cookies,
    user: req.user
  })
});

// router.get('/auth/logout', (req, res) => {
//   // req.session = null; // For clearing the cookie session
//   req.logout();  // Removes the user data
//   res.status(200).json({message: 'Logged Out successfully'});
// });


module.exports = router;