const productControllers = require('../controllers/product.controllers');
const authServices = require('../middleware/authentication.validator');



const routes = (app) => {
    
    app.get('/ecomm/api/v1/products', productControllers.getProduct)
    app.post('/ecomm/api/v1/products', authServices.isAuthenticated, authServices.checkAdmin, authServices.checkAdminOrSeller, productControllers.postProduct)
    app.put('/ecomm/api/v1/products/:id', authServices.isAuthenticated, authServices.checkAdmin, authServices.checkAdminOrSeller, productControllers.putProduct)
    app.delete('/ecomm/api/v1/products/:id', authServices.isAuthenticated, authServices.checkAdmin, authServices.checkAdminOrSeller, productControllers.deleteProduct)
    app.get('/ecomm/api/v1/products/:categoryId', productControllers.getProductsWithCategoryId)
    app.get('/ecomm/api/v1/getProductsWithCategories', productControllers.getProductsWithCategories)
    app.get('/ecomm/api/v1/productsByCostRange/', productControllers.getProductsByCostRange);
}

module.exports = routes;







