const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true },
    password: String
});
module.exports = mongoose.model('User', UserSchema);