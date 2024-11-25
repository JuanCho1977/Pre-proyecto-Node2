const { configObject } = require('./config/index.js')

const authentication = (req, res, next) => {
    console.log(req.session.user)
    if(req.session.user.mail != configObject.EMAIL || !req.session.user.isAdmin ){
            //clave 1234
        return res.status (401).send('error de autenticacion')
    }

    next()

}

module.exports = {authentication}