const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, default: 18 }, // ✅ Corrected type
    isAdmin: { type: Boolean, default: false }, // ✅ Corrected type
});

module.exports = mongoose.model("User", UserSchema);
