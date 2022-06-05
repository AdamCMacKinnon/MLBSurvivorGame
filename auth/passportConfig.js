const { authenticate } = require('passport')
const bcrypt = require('bcryptjs');
const local = require('passport-local').Strategy

function init(passport, getUserByUsername, getUserById) {
    const authenticateUser = async (username, password, done) => {
        const user = getUserByUsername(username)
        if (user == null) {
            return done(null, false, {message: 'No user found!' })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password Incorrect!!' })
            }
        } catch (e) {
            return done(e)
        }
    }
    passport.use(new local({usernameField: 'username'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.username))
    passport.deserializeUser((id, done) => {
        done(null, getUserById(id))
    })
}

module.exports = init