const roleServices = require('../services/role.services');


const addRoleToUser = async(req,res) => {
    const userDataResponse = await roleServices.addRoleToUser(req.body.userEmail, req.body.roleName);
    if(userDataResponse){
        return res.json({
            message: "Successfully added role",
            status: true,
            statuscode: 201,
            data: userDataResponse
        })
    }
    else{
        return res.json({
            message: 'Internal server error',
            success: true,
            code: 500,
        });
    }
    
}
const deleteRoleToUser = async(req,res) => {
    const userDataResponse = await roleServices.deleteRoleToUser(req.body.userEmail, req.body.roleName);
    if(userDataResponse){
        return res.json({
            message: 'Role is deleted successfully',
            success: true,
            code: 200,
            data: userDataResponse
        });
    }
    else{
        return res.json({
            message: 'Internal server error',
            success: true,
            code: 500,
            data: userDataResponse
        });
    }
}

module.exports = {
    addRoleToUser,
    deleteRoleToUser
}