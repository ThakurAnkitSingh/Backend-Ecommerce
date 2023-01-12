const authSevices = require('../services/user.services')
const roleSevices = require('../services/role.services')
const authHelperSevices = require('../services/authHelper.services')


const isAuthenticated = async(req, res, next) => {
    const token = req.headers['x-access-token'];
    if(!token){ // when token is not provided
        return res.json({
            status: 401,
            message: "JWT token is missing",
            err: "Invalid or missing argument in request Header",
            data:{}
        });
    }
    const verifiedResponse = authSevices.verifyJWT(token);
    // it will give me 3 attributes in the response which is email, password, iat.
    if(!verifiedResponse){
        return res.json({
            status: 401,
            message: "Inavlid JWT token",
            err: "Invalid auth details",
            data:{}
        });
    }
    const userData = await authHelperSevices.getUserByEmail(verifiedResponse.email);
    if(!userData){ // it will capture all the details of user
        return res.json({
            status: 401,
            message: "Inavlid JWT token is send to other user",
            err: "Invalid credentials",
            data:{}
        });
    }

    req.user = userData;

    next();

}



const checkAdmin = async(req, res, next) => {
    const userData = req.user;
    // console.log(userData);

    const adminRole = await roleSevices.getRoleByName("admin");
    const isAdmin = await userData.hasRole(adminRole);

    if(!isAdmin){
        return res.json({
            status: 401,
            message: "User is not Admin",
            err: "Unauthorised user",
            data:{}
        });
    }
    next();
}


// seller and admin will CRUD the products
const checkAdminOrSeller = async(req, res, next) => {
    const userData = req.user;

    const adminRole = await roleSevices.getRoleByName("admin");
    const sellerRole = await roleSevices.getRoleByName("seller");

    
    const isAdmin = await userData.hasRole(adminRole);
    const isSeller = await userData.hasRole(sellerRole);

    if(!isAdmin && !isSeller){
        return res.json({
            status: 401,
            message: "User is not Admin",
            err: "Unauthorized user",
            data:{}
        });
    }
    next();
}

module.exports = {
    isAuthenticated,
    checkAdmin,
    checkAdminOrSeller
}