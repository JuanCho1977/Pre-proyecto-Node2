const jwt = require('jsonwebtoken')

const PRIVATE_KEY = 'CoderSecretpara-lafirmA'

const generateToken = user => jwt.sign(user, PRIVATE_KEY, {expiresIn: '1h'})

const authTokenMiddleware = (req, res, next) => {
    /// lo que viene en headers
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    if(!authHeader) 
        return res.status(401).send({status: 'error', error: 'No estas autorizado'});
    
    const token = authHeader.split(' ')[1];// saco el Bearer del token

    jwt.verify(token, PRIVATE_KEY, (error, dataToken) => {
        console.log(dataToken)
        if (dataToken.role !== true) {
            return res.send('No tenes acceso de administrador')
        }
        req.user = dataToken
        next()
    })
}

module.exports = {
    generateToken, 
    authTokenMiddleware,
    PRIVATE_KEY
}