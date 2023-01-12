// 19 September 2022
const { STATUS } = require('../config/order.constants');
const { order, product, Order_Product } = require('../models/index');


const getOrderByUser = async (user, orderStatus) => {
    try {
        // if order or cart is already created
        const orderData = await order.findOne({
            where: {
                userId: user.id,
                status: orderStatus,
            }
        });
        return orderData;
    }
    catch (err) {
        console.log(err);
    }
}

// If order is not created then we are creating order through passing userId which is already a foreignKey in order
const createOrder = async (user) => {
    const orderCreateData = await order.create({ userId: user.id, status: STATUS.CREATION });
    return orderCreateData;
}

const addproductToOrder = async (productId, orderId) => {
    const orderData = await order.findByPk(orderId);
    if (orderData.status !== STATUS.CREATION) {
        return {
            error: 'Order cannot be modified'
        }
    }
    const productData = await product.findByPk(productId);
    if (!productData) {
        return {
            error: 'No such product found'
        }
    }
    const entryInOrder_Product = await orderData.addProduct(productData, { through: { quantity: 1 } });
    return entryInOrder_Product;
}


const removeproductFromOrder = async (productId, orderId) => {
    try {
        const orderData = await order.findByPk(orderId);
        if (orderData.status !== STATUS.CREATION) {
            return {
                error: 'Order cannot be modified'
            }
        }
        const productData = await product.findByPk(productId);
        if (!productData) {
            return {
                error: 'No such product found'
            }
        }

        const entryInOrder_Product = await Order_Product.findOne({
            where: {
                orderId: orderData.id,
                productId: productData.id
            }
        });
        if (!entryInOrder_Product) {
            return {
                error: 'No such product found in the order'
            }
        }
        else {
            if (entryInOrder_Product.quantity <= 1) {
                orderData.removeProduct(productData);
            }
            else {
                await entryInOrder_Product.decrement('quantity', { by: 1 });
            }
        }
        return entryInOrder_Product;
    }
    catch (err) {
        console.log(err);
    }
}



const incrementproductFromOrder = async (productId, orderId) => {
    try {
        const orderData = await order.findByPk(orderId);
        if (orderData.status !== STATUS.CREATION) {
            return {
                error: 'Order cannot be modified'
            }
        }
        const productData = await product.findByPk(productId);
        if (!productData) {
            return {
                error: 'No such product found'
            }
        }

        const entryInOrder_Product = await Order_Product.findOne({
            where: {
                orderId: orderData.id,
                productId: productData.id
            }
        });
        if (!entryInOrder_Product) {
            return {
                error: 'No such product found in the order'
            }
        }
        else {
            if (entryInOrder_Product.quantity < 1) {
                orderData.addproduct(productData);
            }
            else {
                await entryInOrder_Product.increment('quantity', { by: 1 });
            }
        }
        return entryInOrder_Product;
    }
    catch (err) {
        console.log(err);
    }
}




module.exports = {
    getOrderByUser,
    addproductToOrder,
    createOrder,
    removeproductFromOrder,
    incrementproductFromOrder
}

