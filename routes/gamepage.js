const express = require('express');
const router = express.Router();
router.use(express.json());
const models = require('../models');

router.get('/gamepage', (req,res) => {
  res.render('gamepage');

  let user = {
    username: req.session.username,
    isactive: req.session.isactive
  }

  if (user.isactive === true) {
    res.render({ alert: `Hello {{user.username}}, you are currently ACTIVE` })
  } else {
    res.render({ message: `Hello {{user.username}}, you are currently INACTIVE` })
  }

})

router.post('/logout', (req,res) => {
  req.session.destroy(() => {
    res.render('/', { message: 'you have been logged out' })
  })
})



module.exports = router