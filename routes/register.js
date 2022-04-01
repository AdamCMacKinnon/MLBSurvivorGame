const express = require('express');
const router = express.Router();
router.use(express.json());
const bcrypt = require('bcryptjs');
const models = require('../models');
const SALT = 10;

router.get('/register', (req,res) => {
  res.render('register');
});

router.post('/register', async (req,res) =>{
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password

    let persistedUser = await models.users.findOne({
        where: {
            email: email
        }
    })
    if (persistedUser == null) {
        bcrypt.hash(password, SALT, async (error, hash) => {
            if (error) {
                res.render('/register', {message: "SALT ERROR: 1"})
            } else {
                let user = models.users.build({
                    username: username,
                    email: email,
                    password: hash
                })
                let savedUser = await user.save()
                if (savedUser != null) {
                    res.redirect('/login')
                } else {
                    res.render('/register', {message: "User already exists!"})
                }
            }
        })
    }
})


module.exports = router;