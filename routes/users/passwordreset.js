const express = require('express');
const router = express.Router();
router.use(express.json());
const models = require('../../models')
const bcrypt = require('bcryptjs')
const SALT = 10;


router.get('/passwordreset', (req,res) => {
    res.render('passwordreset')
  })


router.post('/passwordreset', async (req,res) => {
    let email = req.body.email
    let password = req.body.password
    let updatepassword = req.body.updatepassword

    let thisUser = await models.users.findOne({
        where: {
            email: email
        }
    })

    if (thisUser == null) {
        res.render('passwordreset', { message: "No such user!  Please register." })
    } else {
        if (password !== updatepassword || password && updatepassword == undefined) {
            res.render('passwordreset', { message: "password do not match!" })
        } else if (updatepassword.length < 7) {
            res.render('passwordreset', { message: 'Password must be at least 8 characters!' })
        } else {
            bcrypt.hash(password, SALT, async (error, hash) => {
                if (error) {
                    res.render('passwordreset', { message: "Hashing error!" })
                } else {
                    await models.users.update({
                        password: hash
                    }, {where: { email: email }})
                    res.redirect('/login')
                }
            });
        }
    }
})


module.exports = router;