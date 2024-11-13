const passport           = require('passport')
//const passportLocal = require('passport-local')
const jwt               = require ('passport-jwt')
const { configObject } = require ('../config/index.js')


const { createHash, isValidPassword } = require('../utils/bcrypt.js')


const JWTStrategy = jwt.Strategy
const Extract     = jwt.ExtractJwt



const initializePassport = () => {

    const cookiesExtractor = rq => {
        let token = null
        if(req && req.cookies){
            token = req.cookies['token']
        } 
        return token
    }
    // middleware son las estrategias que vamos a crear y configurar
    passport.use ('jwt', new JWTStrategy({
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookiesExtractor]),
        secretOrKey: configObject.private_key

    }, async (jwt_playload, done) =>{
        try {
            return done(null, jwt_playload)
        } catch (error) {
            return done(error)
        }

    }))
}

module.exports = {
    initializePassport
}