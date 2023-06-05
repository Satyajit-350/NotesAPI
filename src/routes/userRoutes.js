const express = require("express");
const { signup, signin, forget_password, reset_passwords } = require("../controllers/userController"); //import
const user = require("../models/user");
const userRouter = express.Router();

//signup method
userRouter.post("/signup",signup)

//signin method
userRouter.post("/signin",signin)

//forget password
userRouter.post("/forget-password",forget_password)

//reset password
userRouter.get('/reset-password', async (req, res) => {
    try {
        const token = req.query.token;
        const tokenData = await user.findOne({token: token});
        if(tokenData){
            res.render('reset_password', {
                title: 'Reset Password',
                token: token
            });
        }else{
            res.render('reset_password_error', {
                title: 'Reset Password Error',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
});

userRouter.get('/reset-passwords', reset_passwords);

module.exports = userRouter