const User = require('../../models/user');
const constants = require('../../constant/static');
const { status } = constants;

const getAllUsers = async (req,res) => {
    const users = await new User().getAllUsers();
    return res.status(status.Ok).json(users); 
}

const createUser = async (req, res) => {
   const user = req.body;
   const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
     if (!validEmail.test(user.email) && user.email)  return res.status(status.BadValidation).json(constants.BadEmail); 
   const newUser = await new User().createUser(user);
   return res.status(status.Ok).json(newUser); 
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const findDeleteUser = await new User().getOneUser(id);
    if(findDeleteUser){
        const deleteUser = await new User().deleteById(id);
        return res.status(status.Ok).json(deleteUser); 
    }
    return res.status(status.NotFound).json(constants.NotFound); 
}

const getOneUser = async (req, res) => {
    const id = req.params.id;
    const findOne = await new User().getOneUser(id);
    if(findOne) return res.status(status.Ok).json(findOne); 
    return res.status(status.NotFound).json(constants.NotFound);
    
}

const updateUser = async (req, res) => {
    const user = req.body;
    const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
     if (!validEmail.test(user.email) && user.email)  return res.status(status.BadValidation).json(constants.BadEmail); 
    const id = req.params.id;
    const findDeleteUser = await new User().getOneUser(id);
    if(findDeleteUser){
        const updateUser = await new User().updateUser(user,id);
        return res.status(status.Ok).json(updateUser);  
    }
    return res.status(status.NotFound).json(constants.NotFound); 
    
}

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    getOneUser
}
