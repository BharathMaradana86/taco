const jwt= require('jsonwebtoken')

module.exports= function(req,res,next)
{
    try{
        let token= req.header('x-token')

        if(!token){
            return res.json('no token present')        
        }

        let decoder=jwt.verify(token,'EternalRobotics')
        req.user= decoder.user
        console.log(req.user)
        next()

    }catch(err){
        console.log(err)
        console.log('hey its jwt')
    }
}