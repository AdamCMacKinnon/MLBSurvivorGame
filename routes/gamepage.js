const express = require('express');
const router = express.Router();
router.use(express.json());
const models = require('../models');

router.get('/gamepage', async (req,res) => {
  res.render('gamepage');
  console.log(req.session)
})

router.post('/gamepage', async (req,res) => {
  const week = "week2"
  const user = req.session.username
  let userpick = req.body.pick
  console.log(user, week, userpick)

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
})

router.post('/logout', (req,res) => {
  req.session.destroy(() => {
    res.redirect('/', { message: 'you have been logged out' })
  })
})



module.exports = router