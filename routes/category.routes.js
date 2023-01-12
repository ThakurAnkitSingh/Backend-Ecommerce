const categoryControllers = require('../controllers/category.controllers');
const authServices = require('../middleware/authentication.validator');



const routes = (app) => {
    app.get('/ecomm/api/v1/categories', categoryControllers.getCategory)
    app.post('/ecomm/api/v1/categories', authServices.isAuthenticated, authServices.checkAdmin, categoryControllers.postCategory)
    app.put('/ecomm/api/v1/categories/:id', authServices.isAuthenticated, authServices.checkAdmin, categoryControllers.putCategory)
    app.delete('/ecomm/api/v1/categories/:id', authServices.isAuthenticated, authServices.checkAdmin, categoryControllers.deleteCategory)
}

module.exports = routes;