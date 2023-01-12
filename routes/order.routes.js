const orderControllers = require('../controllers/order.controllers');
const authServices = require('../middleware/authentication.validator');

const routes = (app) => {
    // to add products to order
    app.post('/ecomm/api/v1/addProducts', authServices.isAuthenticated, orderControllers.addProducts)

    //to remove products from order
    app.patch('/ecomm/api/v1/removeProduct', authServices.isAuthenticated, orderControllers.removeProduct);

    // to add and increment products to order
    app.patch('/ecomm/api/v1/addAndIncrementProducts', authServices.isAuthenticated, orderControllers.incrementProduct)

}

module.exports = routes;