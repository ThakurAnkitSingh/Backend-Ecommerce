const productServices = require('../services/product.services');

const getProduct = async (req, res) => {
    const response = await productServices.getProduct();
    return res.json({
        message: "Successfully Fetched the Products",
        status: 200,
        data: response
    })
}
const postProduct = async (req, res) => {
    const responsea = await productServices.postProduct(req.body);
    return res.json({
        message: "Successfully created the Products",
        status: 201,
        data: responsea
    })
}
const putProduct = async (req, res) => {
    const responseb = await productServices.putProduct(req.params.id, req.body);
    return res.json({
        message: "Successfully updated the Products",
        status: 201,
        data: responseb
    })
}
const deleteProduct = async (req, res) => {
    const responsec = await productServices.deleteProduct(req.params.id);
    return res.json({
        message: "Successfully deleted the Products",
        status: 200,
        data: responsec
    })
}
const getProductsWithCategoryId = async (req, res) => {
    const responsec = await productServices.getProductsWithCategoryId(req.params.categoryId);
    return res.json({
        message: "Successfully fetched the Products by category Id",
        status: 200,
        data: responsec
    })
}
const getProductsWithCategories = async (req, res) => {
    const responsec = await productServices.getProductsWithCategories();
    return res.json({
        message: "Successfully fetched the Products with Categories",
        status: 200,
        data: responsec
    })
}


const getProductsByCostRange = async(req, res) =>{
    const productResponse = await productServices.getProductsByAllCostRange(req.query);
    return res.json({
        message: 'Successfully fetched the filter product by a cost',
        success: true,
        code: 200,
        data: productResponse
    });
}

module.exports = {
    getProduct,
    postProduct,
    putProduct,
    deleteProduct,
    getProductsWithCategoryId,
    getProductsWithCategories,
    getProductsByCostRange}