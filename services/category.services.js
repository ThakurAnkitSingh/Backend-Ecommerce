const { category } = require('../models/index');

const getCategory = async () => {
    const response1 = await category.findAll();
    return response1;
}
const postCategory = async (data) => {
    const response2 = await category.create({
        name: data.name,
        descripton: data.descripton
    });
    return response2;
}
const putCategory = async (id, data) => {
    const response3 = await category.update({name: data.name, description: data.description}, {
        where:{
            id: id
        }
    });
    return response3;
}
const deleteCategory = async (id) => {
    const response4 = await category.destroy({
        where: {
          id: id
        }
    });
    return response4;
}

module.exports = {
    getCategory,
    postCategory,
    putCategory,
    deleteCategory
}