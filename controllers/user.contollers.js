const userServices = require('../services/user.services');
const authHelperService = require('../services/authHelper.services')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const postSignUp = async(req,res) => {
    const response = await userServices.signUp(req.body);
    return res.json({
        message: "Successfully created your Account",
        status: 201,
        success: true,
        data: response
    })
}

const postSignIn = async(req,res) => {
    // We have to give userEmail and password
    const userData = await authHelperService.getUserByEmail(req.body.userEmail);
    if(!userData){ //if email is not in the DB
        return res.json({
            message: "Your email is incorrect, Please try again",
            status: true,
            code:400,
            data: null
        })
    }else{ //if it is there then we are checking user password and hashed password from DB 
        const verifiedPassword = userServices.verifyPassword(req.body.password, userData.password);
        if(verifiedPassword){
            const token = jwt.sign({email:userData.email, password:userData.password, userName:userData.userName}, process.env.JWT_SECRET_KEY);
            return res.json({
                message: "Successfully Signin",
                status: true,
                code:200,
                token: token
            });
        }else{
            return res.json({
                message: "Your password is incorrect, Please try again",
                status: true,
                code:400,
                data: {}
            });
        }
    }
}

const deleteUser = async(req,res) => {
    const deleteUserData = await userServices.deleteUser(req.params.userId)
    return res.json({
        message: "Successfully deleted the user by admin",
        status: true,
        code: 200,
        data: deleteUserData
    })
}




module.exports = {
    postSignUp,
    postSignIn,
    deleteUser
}