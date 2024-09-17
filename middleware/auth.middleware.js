const {verify} = require("jsonwebtoken");
const {User} = require("../models");

const auth = async (req, res, next) => {
    
    try {
        const { authorization } = req.headers;
        if(!authorization) throw new UnauthenticatedError("Please login first");

        const [type, token] = authorization.split(" ");             //membaca & split token
        const decoded = verify(token, process.env.JWT_SECRET);      //memverify token
        const user = await User.findOne({where: {email: decoded.email}});    //memverify user 
        
        if(!user) throw new Error("User is not registered");
        req.user = user;
    } catch (error) {
        // return res.status(401).json({message: error.message})
        next(error);
    }
    next();
};

module.exports = auth;