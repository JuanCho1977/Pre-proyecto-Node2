const authorization = role => {
    return async (req, res, next) => {

        if(!req.user) return res.estatus(401).send({error: 'Unauthorized'})
        if(req.user.rol =! role) return res.status(403).send({error: 'not Permissions'})
        next()    

    }
}


module.exports = {
    authorization
}