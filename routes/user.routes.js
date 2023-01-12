const userControllers = require('../controllers/user.contollers');
const authServices = require('../middleware/authentication.validator');


const routes = (app) => {
    // for creating a Account
    app.post('/ecomm/api/v1/signup', userControllers.postSignUp)
    // for fetching a Account
    app.post('/ecomm/api/v1/signin', userControllers.postSignIn)
    // deleting the Account
    app.delete('/ecomm/api/v1/user/:userId', authServices.isAuthenticated, authServices.checkAdmin, userControllers.deleteUser)
   
}

module.exports = routes;







 