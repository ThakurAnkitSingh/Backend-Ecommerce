const roleControllers = require('../controllers/role.controllers');
const authServices = require('../middleware/authentication.validator');


const routes = (app) => {
    // user to add roles
    app.post('/ecomm/api/v1/role', authServices.isAuthenticated, authServices.checkAdmin, roleControllers.addRoleToUser)
    // user to delete roles
    app.delete('/ecomm/api/v1/role', authServices.isAuthenticated, authServices.checkAdmin, roleControllers.deleteRoleToUser)
}

module.exports = routes;







 