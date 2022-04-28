const express = require('express');
const router = express.Router();
router.use(express.json());
const models = require('../models');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');

router.get('/gamepage', async (req,res) => {
  let isactive = req.session.isactive
  let user = req.session.username
  if (isactive === true) {
    res.render('gamepage', { alert: `Hello ${user}, You are currently ACTIVE`})
  } else {
    res.render('gamepage', { alert: `Hello ${user}, you have been ELIMINATED`})
  }

  // const prevPicks = await sequelize.query(`SELECT week1 FROM picks WHERE user='${user}'`, { type: QueryTypes.SELECT })
  // console.log(prevPicks)
})

router.post('/gamepage', async (req,res) => {
  const user = req.session.username
  const status = req.session.isactive
  const userid = req.session.id
  const userpick = [req.body.pick]

  if (status === false) {
    res.render('gamepage', { message: 'Sorry, you have been eliminated!' })
  } else {
      let findId = await models.picks.findOne({
        where: {
          userid: userid
        }
      })
      if (findId !== null) {
        await models.picks.update({
          userid: userid,
          username: user,
          picks: userpick
        }, {
          where: {
            userid: userid
          }
        })
          res.render('gamepage', {message: `Week 3 Pick: ${userpick}`})
      } else {
          let pick = models.picks.build({
        userid: userid,
        username: user,
        picks: userpick
      })
          let savedPick = await pick.save()
        if (savedPick != null) {
          res.render('gamepage', {message: `Week 3 Pick: ${userpick}`})
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