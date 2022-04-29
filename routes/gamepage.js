const express = require('express');
const router = express.Router();
router.use(express.json());
const models = require('../models');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');
const { TEXT } = require('sequelize');

router.get('/gamepage', async (req,res) => {
  const seePicks = comparePicks(userid, userpick)
  let userid = req.session.id
  let isactive = req.session.isactive
  let user = req.session.username
  if (isactive === true) {
    res.render('gamepage', { alert: `Hello ${user}, You are currently ACTIVE`})
    } else {
      res.render('gamepage', { alert: `Hello ${user}, you have been ELIMINATED`})
    }
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
        const seePicks = await comparePicks(userpick, userid)
        if (seePicks == true) {
          res.render('gamepage', { message: `You already picked the ${userpick}` })
        } else {
          res.render('gamepage', {message: `Current Pick: ${userpick}`})
        }
        await models.picks.update({
          'picks': sequelize.fn('array_append', sequelize.col('picks', TEXT), userpick.toString())
        }, {
          where: {
            userid: userid
          }
        })
          // res.render('gamepage', {message: `Week 3 Pick: ${userpick}`})
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
          comparePicks(userpick, userid)
        }
      }
    }
})

router.post('/logout', (req,res) => {
  req.session.destroy(() => {
    res.redirect('/', { message: 'you have been logged out' })
  })
})

async function comparePicks(userpick, userid) {
  const picksArr = 
  await models.picks.findAll({
    where: {
      userid: userid
    },
    attributes: ['picks'],
    raw: true
  })
  console.log(picksArr)
  for (let p = 1; p < picksArr.length; p++) {
    if (picksArr.picks[p] === userpick) {
      return true
    } else {
      return false
    }
  }
}



module.exports = router