const express = require('express');
const router = express.Router();
const schedule = require('../data/schedule.json');
router.use(express.json());


router.get('/schedules', (req,res) => {
    res.render('schedules');


})

router.post('/schedules', (req,res) => {
    let team = req.body.team
    console.log(team)
    let teams = Object.values(schedule);
    let teamName = teams.filter((t) => team)
    console.log(teams[8], teamName.indexOf(teamName))
})

module.exports = router;