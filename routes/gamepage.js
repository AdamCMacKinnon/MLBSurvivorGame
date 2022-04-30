const express = require('express');
const router = express.Router();
router.use(express.json());
const models = require('../models');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');
const { TEXT } = require('sequelize');

router.get('/gamepage', async (req,res) => {
  let userid = req.session.id
  let isactive = req.session.isactive
  let user = req.session.username
  const picksArr = 
  await models.picks.findAll({
    where: {
      userid: userid
    },
    attributes: ['picks'],
    raw: true
  })
  const seePicks = JSON.stringify(picksArr)
  let result = picksArr.map(p => p.picks)
  const picksResult = result[0]
  console.log("PICKS RESULT " + picksResult)
  console.log(seePicks)
  console.log("RESULT " + result)
  if (isactive === true) {
    res.render('gamepage', { alert: `Hello ${user}, You are currently ACTIVE`} &&
    { picksResult: result })
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
  console.log("OBJECT " + Object.values(picksArr[0]))
  for (let p = 0; p < picksArr.length; p++) {
    if (Object.values(picksArr)[p] === userpick) {
      return true
    } 
  }
}



module.exports = router