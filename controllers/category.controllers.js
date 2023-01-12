const categoryServices = require('../services/category.services');

const getCategory = async (req, res) => {
    const response = await categoryServices.getCategory();
    return res.json({
        message: "Successfully Fetched the Categories",
        status: 200,
        data: response
    })
}
const postCategory = async (req, res) => {
    const responsea = await categoryServices.postCategory(req.body);
    return res.json({
        message: "Successfully created the Categories",
        status: 201,
        data: responsea
    })
}
const putCategory = async (req, res) => {
    const responseb = await categoryServices.putCategory(req.params.id, req.body);
    return res.json({
        message: "Successfully updated the Categories",
        status: 201,
        data: responseb
    })
}
const deleteCategory = async (req, res) => {
    const responsec = await categoryServices.deleteCategory(req.params.id);
    return res.json({
        message: "Successfully deleted the Categories",
        status: 200,
        data: responsec
    })
}


module.exports = {
    getCategory,
    postCategory,
    putCategory,
    deleteCategory
}