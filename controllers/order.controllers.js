const orderServices = require('../services/order.services');
const {STATUS} = require('../config/order.constants');

const addProducts = async(req, res) => {
    //get user's order which is in creation status
    let Order = await orderServices.getOrderByUser(req.user, STATUS.CREATION);

    if(!Order){ //if no existing order in creation status, then create a new order
        Order = await orderServices.createOrder(req.user);
    }
    
    const response = await orderServices.addproductToOrder(req.body.productId, Order.id);
    if(response.error){
        return res.json({
            status: 400,
            success: true,
            message: response.error
        });
    }

    if(response){
        return res.json({
            statusCode: 200,
            success: true,
            message: "Successfully added products to order"
        })
    }
}

const removeProduct = async(req, res) =>{
    let Order = await orderServices.getOrderByUser(req.user, STATUS.CREATION);
    if(!Order){
        return res.json({
            status: 400,
            success: true,
            message: 'No product in order'
        });
    }

    const response = await orderServices.removeproductFromOrder(req.body.productId, Order.id);

    if(!response){
        return res.json({
            status: 400,
            success: true,
            message: 'Product does not exists in order'
        });
    }
    if(response.error){
        return res.json({
            status: 400,
            success: true,
            message: response.error
        });
    }
    return res.json({
        status: 200,
        success: true,
        message: 'Product removed from order successfully'
    });

}

// HomeWork Question Increment the products when you adding you products

const incrementProduct = async(req, res) =>{
    let Order = await orderServices.getOrderByUser(req.user, STATUS.CREATION);
    if(!Order){
        return res.json({
            status: 400,
            success: true,
            message: 'No product in order'
        });
    }

    const response = await orderServices.incrementproductFromOrder(req.body.productId, Order.id);

    if(!response){
        return res.json({
            status: 400,
            success: true,
            message: 'Product does not exists in order'
        });
    }
    if(response.error){
        return res.json({
            status: 400,
            success: true,
            message: response.error
        });
    }
    return res.json({
        status: 200,
        success: true,
        message: 'Product incremented from order successfully'
    });

}


module.exports = {
    addProducts,
    removeProduct,
    incrementProduct
}

