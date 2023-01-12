const { product, category } = require('../models/index');
const {Op} = require('sequelize');


const getProduct = async () => {
    const response1 = await product.findAll();
    return response1;
}
const postProduct = async (data) => {
    const response2 = await product.create({
        name: data.name,
        cost: data.cost,
        description: data.description,
        categoryId: data.categoryId
    });
    return response2;
}
const putProduct = async (id, data) => {
    const response3 = await product.update({
        name: data.name,
        description: data.description,
        cost: data.cost,
        categoryId: data.categoryId
    }, {
        where:{
            id: id
        }
    });
    return response3;
}
const deleteProduct = async (id) => {
    const response4 = await product.destroy({
        where: {
          id: id
        }
    });
    return response4;
}


const getProductsWithCategoryId = async (categoryId) => {
    const response4 = await product.findAll({
        where: {
            categoryId: categoryId
        }
    });
    return response4;
}


const getProductsWithCategories = async () => {
    const response4 = await product.findAll({include:category});
    return response4;
}


const getProductsByAllCostRange = async(data) =>{
    const response = await product.findAll({
        where: {
          cost: {
            [Op.between]: [data.minCost, data.maxCost]
          }
        }
      });
    return response;
}


module.exports = {
    getProduct,
    postProduct,
    putProduct,
    deleteProduct,  
    getProductsWithCategoryId,
    getProductsWithCategories,
    getProductsByAllCostRange
}