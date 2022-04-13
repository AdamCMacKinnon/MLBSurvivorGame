const express = require('express');
const router = express.Router();
router.use(express.json());
const models = require('../models');
const queries = require('../public/js/queries.js')

router.get('/gamepage', async (req,res) => {
  res.render('gamepage');
  console.log(req.session)
})

router.post('/gamepage', async (req,res) => {
  const week = "week1"
  const user = req.session.username
  let userpick = req.body.pick
  console.log(user, week, userpick)

  // let uniquePick = await models.picks.findOne({
  //   where: {
  //     user: user,
  //     userpick: userpick
  //   }
  // })
  if (userpick != null) {
    let pick = models.picks.build({
      user: user,
      week1: userpick
    })
    let savedPick = await pick.save()
    if (savedPick != null) {
      res.render('gamepage', {message: `Your Pick of ${userpick} is in!`})
    } else {
      res.render('gamepage', {message: "You've already picked that team!"})
    }
  }
})

router.post('/logout', (req,res) => {
  req.session.destroy(() => {
    res.render('/', { message: 'you have been logged out' })
  })
})



module.exports = router