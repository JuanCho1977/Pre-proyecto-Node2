const authentication = (req, res, next) => {
    if(req.session.user.email != 'juan3@gmail.com' || !req.session.user.isAdmin != true ){

        return res.status (401).send('error de autenticacion')
    }

    next()

}

module.exports = {authentication}