const express = require('express');
const router = express.Router();
router.use(express.json());
const models = require('../models');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');

router.get('/gamepage', async (req,res) => {
  res.render('gamepage');
})

router.post('/logout', (req,res) => {
  req.session.destroy(() => {
    res.render('/', { message: 'you have been logged out' })
  })
})



module.exports = router