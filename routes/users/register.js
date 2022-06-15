const express = require('express');
const router = express.Router();
router.use(express.json());
const bcrypt = require('bcryptjs');
const models = require('../../models');
const UUID = require('uuid');
const SALT = 10;

router.get('/register', (req,res) => {
  res.render('register');
});

router.post('/register', async (req,res) =>{
    let username = req.body.username
    let email = req.body.email.toLowerCase()
    let password = req.body.password

    let persistedUser = await models.users.findOne({
        where: {
            username: username,
            email: email
        }
    })

    if (persistedUser == null) {
        bcrypt.hash(password, SALT, async (error, hash) => {
            if (error) {
                res.render('register', { message: "There was an error!"})
            }
            else if (password.length < 7) {
                res.render('register', { message: 'Password must be at least 8 characters!' })
            } else {
                let user = models.users.build({
                    id: UUID.v4(),
                    username: username,
                    email: email,
                    password: hash,
                    isactive: true
                })
                let savedUser = await user.save()
                if (savedUser != null) {
                    res.redirect('login')
                } else {
                    res.render('register', { message: "User Already Exists!"})
                }
            }
        })
    } else {
        res.render('register', { message: "User Already Exists!"})
    }
})


module.exports = router;