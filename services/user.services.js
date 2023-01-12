const { user, role } = require('../models/index');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const signUp = async (data) => {
    const response = await user.create({
        userName: data.userName,
        email: data.email,
        password: data.password
    });
    // console.log(response, "userResponse")


    // Now if we sign up then our role will be set to customer

    try {
        const customerRole = await role.findOne({
            where: {
                name: 'customer'
            }
        });
        //assigning the role of customer by default
        const userData = await response.addRole(customerRole);
        return userData;
    }

    // const user = await User.findByPk(userData.id);
    catch (err) {
        console.log(err);
    }




    return response;
}


// const getUserByEmail = async(data) => {
//     const response = await user.findOne({
//         where: {
//             email: data
//         }
//     });
//     return response;
// }

// It will verify the hashed and original password (business should be here)
const verifyPassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
}

// it will verify jwt token
const verifyJWT = (token) => {
    try {
        const response = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return response;
    } catch (err) {
        console.log(err);
    }

}


const deleteUser = async (userId) => {
    const response = await user.destroy({
        where: {
            id: userId
        }
    });
    return response;
}




module.exports = {
    signUp,
    verifyPassword,
    verifyJWT,
    deleteUser
}