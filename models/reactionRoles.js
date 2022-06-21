const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    Guild: String,
    Channel: String,
    Message: String,
    Roles: Object
})

module.exports = mongoose.model('reactionRoles', Schema);