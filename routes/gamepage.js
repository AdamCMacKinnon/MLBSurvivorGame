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
    { message: `Hello {{user.username}}, you are currently ACTIVE` }
  } else {
    { message: `Hello {{user.username}}, you are currently INACTIVE` }
  }

})



module.exports = router