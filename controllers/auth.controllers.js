const { hash, genSalt, compareSync } = require("bcrypt");
const { User } = require("../models");
const UnauthenticatedError = require("../errors/UnAuthenticatedError");
const {sign} = require ("jsonwebtoken");


exports.register = async (req, res, next) => {
    const {name, username, email, phoneNumber, address, role, password} = req.body;
    
    try {
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);
        const user = await User.create({ name, username, email, phoneNumber, address, role, password:hashedPassword });
        // res.status(201).json(user);
        res.status(201).json({message: "Success creating new user", 
            id: user.id,
            name: user.name, 
            username: user.username, 
            email: user.email, 
            role: user.role, 
            PhoneNumber: user.PhoneNumber, 
            address: user.address});
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next)  =>{
    const {email, password} = req.body;
try {
    const user = await User.findOne({
        where: {email},
    });

    if(!user) throw new UnauthenticatedError("Invalid email or password");
    if(!compareSync(password, user.password)){
        throw new UnauthenticatedError("Invalid email or password");
    }
    const payload ={
        name: user.name,
        email: user.email,
        role: user.role
    };

    const token = sign(payload, process.env.JWT_SECRET, {expiresIn: "30m"});

    res.status(200).json({ token, name: user.name, role: user.role, id: user.id });
} catch (error) {
    next(error);
}
}