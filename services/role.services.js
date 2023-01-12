const {user, role} = require('../models/index');
const authHelperService = require('./authHelper.services')


const addRoleToUser = async(userEmail, roleName) => {
    // try{
    //     const userDetails = await user.findOne({
    //         where: {
    //             id: userId
    //         }
    //     })
    //     const roleDetails = await role.findOne({
    //         where: {
    //             id: roleId
    //         }
    //     })
    
        
    // }catch(err){
    //     console.log(err);
    // }

    try{
        const userDetails = await authHelperService.getUserByEmail(userEmail);
        const roleDetails = await getRoleByName(roleName);
        
        const response = await userDetails.addRole(roleDetails);
        return response;
    }
    catch(err){
        console.log(err);
    }



}

const deleteRoleToUser = async(userEmail, roleName) => {
    // try{
    //     const userDetails = await user.findOne({
    //         where: {
    //             id: userId
    //         }
    //     })
    //     const roleDetails = await role.findOne({
    //         where: {
    //             id: roleId
    //         }
    //     })
    
    //     const response = await userDetails.removeRole(roleDetails)
    //     return response;
    // }catch(err){
    //     console.log(err);
    // }


    try{
        const userDetails = await authHelperService.getUserByEmail(userEmail);
        const roleDetails = await getRoleByName(roleName);
        const response = await userDetails.removeRole(roleDetails)
        return response;
    }
    catch(err){
        console.log(err);
    }


}



const getRoleById = async(id) => {
    try{
        const response = await role.findByPk(id);
        return response;
    }catch(err){
        console.log(err);
    }
}



const getRoleByName = async(roleName) =>{
    try{
        const response = await role.findOne({
            where: {
                name: roleName
            }
        });
        return response;
    }
    catch(err){
        console.log(err);
    }
}


module.exports = {
    addRoleToUser,
    deleteRoleToUser,
    getRoleById,
    getRoleByName
}