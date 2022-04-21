const express = require('express');
const router = express.Router();
router.use(express.json());
const bcrypt = require('bcryptjs')
const models = require('../models');

router.get('/login', (req,res) => {
  res.render('login');
});

router.post('/login', async (req,res) => {
    let username = req.body.username
    let password = req.body.password

    let user = await models.users.findOne({
        where: {
            username: username,

        }
    })
    if (user != null) {
        bcrypt.compare(password, user.password, (error, result) => {
            if (result) {
                if (req.session) {
                    req.session = { username: user.username, id: user.id, isactive: user.isactive }
                }
                res.redirect('/gamepage')
            } else {
                res.render('login', { message: 'Incorrect Username or Password (1)'})
            }
        })
    } else {
        res.render('login', { message: 'Incorrect username or password (2)'})
    }

})
module.exports = router;