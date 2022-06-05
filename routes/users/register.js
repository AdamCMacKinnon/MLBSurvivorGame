const express = require('express');
const router = express.Router();
router.use(express.json());
const bcrypt = require('bcryptjs');
const models = require('../../models');
const SALT = 10;

router.get('/register', (req,res) => {
  res.render('register');
});

router.post('/register', async (req,res) =>{
    let username = req.body.username.toLowerCase()
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
            } else {
                let user = models.users.build({
                    id: UUIDV4(),
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