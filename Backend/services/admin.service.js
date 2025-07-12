const adminModel = require('../models/admin.model');


module.exports.createAdmin = async ({
    firstname, lastname, email, password
}) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }
    const admin = adminModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })

    return admin;
}