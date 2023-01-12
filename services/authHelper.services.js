const {user} = require('../models/index')

const getUserByEmail = async(userEmail) => {
    const response = await user.findOne({
        where: {
            email: userEmail
        }
    })
    return response;
};

module.exports = {
    getUserByEmail
}
