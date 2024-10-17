const authentication = (req, res, next) => {
    console.log(req.session.user)
    if(req.session.user.mail != 'juan3@gmail.com' || !req.session.user.isAdmin ){
            //clave 1234
        return res.status (401).send('error de autenticacion')
    }

    next()

}

module.exports = {authentication}