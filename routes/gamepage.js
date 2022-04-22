const express = require('express');
const router = express.Router();
router.use(express.json());
const models = require('../models');

router.get('/gamepage', async (req,res) => {
  let isactive = req.session.isactive
  let user = req.session.username
  if (isactive === true) {
    res.render('gamepage', { alert: `Hello ${user}, You are currently ACTIVE`})
  } else {
    res.render('gamepage', { alert: `Hello ${user}, you have been ELIMINATED`})
  }
})

router.post('/gamepage', async (req,res) => {
  const week2 = "week2"
  const user = req.session.username
  const status = req.session.isactive
  let userpick = req.body.pick

  if (status === false) {
    res.render('gamepage', { message: 'Sorry, you cannot make any more picks this year!' })
  } else {
    if (userpick != null) {
      let pick = models.picks.build({
        user: user,
        week2: userpick
      })
      let savedPick = await pick.save()
      if (savedPick != null) {
        res.render('gamepage', {message: `Week 2 Pick: ${userpick}`})
      } else {
        res.render('gamepage', {message: "You've already picked that team!"})
      }
    }
  }
})

router.post('/logout', (req,res) => {
  req.session.destroy(() => {
    res.redirect('/', { message: 'you have been logged out' })
  })
})



module.exports = router