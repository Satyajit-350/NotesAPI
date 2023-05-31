const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer')
const randomstring = require('randomstring');
const user = require("../models/user");
const config = require("../config/config")
const SECRET_KEY = "NOTES_API_SECRET_KEY";


const sendResetPasswordMail = async(name,email,token) =>{

    try {
        
        const transporter  = nodemailer.createTransport({
            service: 'gmail',
            host : "smtp.gmail.com",
            port : 465,
            secure : true,
            auth : {
                user: config.emailUser,
                pass: config.emailPassword
            }
        })

        const mailoptions = {
            from : config.emailUser,
            to : email,
            subject : "For Reset Password",
            //TODO reset password link we have to create 
            html : '<p> Hii, Please copy this link and <a href ="https://notes-api-india.onrender.com/users/reset-password?token='+token+'"> reset your password</a>'
        }

        transporter.sendMail(mailoptions,function(error,info){

            if(error){
                console.log(error)
            }else{
                console.log("Mail has been sent : ",info.response)
            }

        });

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong"})
    }
}

const signup = async(req,res) => {
    //here we have to register our user i.e., we have to store them in the database 
    //all the database related works are asynchronous because it takes some more time so we have made it asynchronous

    //check for existing user
    //then create a hash password => generally when we store the password in our database we first enccrypt that for security purpose
    //then user creation 
    //then token generation

    const {username,email,password} = req.body;
    try{

        //it will take some time so we use await so the execution waits until it gets any results
        //if we use await make sure to make the parent fnction as async
        const exixtingUser = await userModel.findOne({email : email}) //findone connects the database are perform the search on the basis of filter applied i.e., email
        if(exixtingUser){
            return res.status(400).json({message : "User already exist"});
        }

        //passord hashing using bcrypt
        const hashedPassord = await bcrypt.hash(password,10);//10 means the hashing function will run how many times also known as salt

        const results = await userModel.create({
            email: email,
            password: hashedPassord,
            username: username
        })//here mongoDB has created a unique id for us

        //create tokens jwt tokens (json web tokens)
        const token = jwt.sign({email: results.email, id: results._id},SECRET_KEY)//it has two parameters one is payload(from which we can indentify the user) another one is secret key(to encrypt the token)
        res.status(201).json({user: results, token: token})


    }catch(error){
        console.log(error)
        res.status(500).json({message: "Something went wrong"})
    }

}

const signin = async (req,res) => {
    const {email,password} = req.body;
    try {
        
        //check for existing user
        const exixtingUser = await userModel.findOne({email : email}) //findone connects the database are perform the search on the basis of filter applied i.e., email
        if(!exixtingUser){
            return res.status(404).json({message : "User not found"});
        }

        //then check for credentials using bcrypt library
        const matchPassword = await bcrypt.compare(password,exixtingUser.password); //comaprison between normal password and hash password 

        if(!matchPassword){
            return res.status(400).json({message: "Invalid Credentials"});
        }
        //perform signin
        //generate token
        const token = jwt.sign({email: exixtingUser.email, id: exixtingUser._id},SECRET_KEY)
        res.status(200).json({user: exixtingUser, token: token})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"})
    }

}
const forget_password = async(req,res)=> {
    const {username,email,password} = req.body;
    try {
        
        //first check the mail if it exis or not
        const exixtingUser = await userModel.findOne({email : email})
        if(!exixtingUser){
            return res.status(404).json({message : "User not found"});
        }

       const randomString = randomstring.generate();
       await user.updateOne({email: email},{$set:{token: randomString}});

       //send email
       sendResetPasswordMail(username,email,randomString)
       res.status(200).json({message: "Email sent please check your inbox."})


    } catch (error) {
        console.log(error)
        res.status(400).json({message: "Something went wrong"})
    }
}

const reset_passwords = async(req,res) => {

    try {
        //validate the token
        const token = req.query.token;
        const tokenData = await user.findOne({token: token});
    
        if(tokenData){
            const password = req.query.password;
            
            if (!password) {
                throw new Error('Password is required.');
            }
    
            //convert password into hash format
            const newPassword = await bcrypt.hash(password, 10);
            const userData = await user.findByIdAndUpdate(
                {_id: tokenData._id},
                {$set: {password: newPassword, token: ''}},
                {new: true}
            );
    
            // res.render('reset_password_success', {
            //     title: 'Reset Password Successfull',
            // });
            res.status(200).json({message: "Password reset Successful.", user: userData});
    
        } else {
            // console.log(error);
            // res.render('reset_password_success', {
            //     title: 'Reset Password Error',
            // });
            res.status(400).json({message: "This link has been expired."});
        }
            
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Something went wrong"});
    }
}
module.exports = {signin,signup,forget_password,reset_passwords}