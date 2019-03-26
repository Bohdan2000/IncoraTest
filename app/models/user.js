const mongoose = require('mongoose');
const { Schema } = mongoose;

const userScheme = new Schema({
    first_name: {
        type: String,
        default: ''
    },
    last_name: {
        type: String,
        default: ''
    },
    age: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        default: ''
    },
}, { 
    versionKey: false 
})

const user = mongoose.model('user', userScheme);

class User {
    static get tableName() {
        return 'users';
    }

    getAllUsers() {
        return new Promise(async (resolve, reject) => {
            await user.find({}, (err, users) => {
                if(err) return reject(err)
                resolve(users);
            })
        });
    }

    createUser(userData) {
        return new Promise(async (resolve, reject) => {
            await user.create(userData, (err, res) => {
                if(err) return reject(err)
                resolve(res);
            })
        });
    }

    deleteById(_id) {
        return new Promise(async (resolve, reject) => {
            await user.findByIdAndDelete(_id, (err, users) => {
                if(err) return reject(err)
                resolve(users);
            })
        });
    }

    getOneUser(_id) {
        return new Promise(async (resolve, reject) => {
            await user.findById(_id, (err, users) => {
                if(err) return reject(err)
                resolve(users);
            })
        });
    }

    updateUser(userData,_id) {
        console.log(userData);
        return new Promise(async (resolve, reject) => {
            await user.findOneAndUpdate({_id},userData , { new: true, runValidators: true}, (err, res) => {
                if(err) return reject(err)
                resolve(res);
            })
        });
    }

}

module.exports = User;