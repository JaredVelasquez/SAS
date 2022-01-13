const mongoose = require("mongoose");
const {Schema} = mongoose;

const ProfileSchema = new Schema (
    {
        firstName:{type: String, required: false},
        lastName:{type: String, required: false},
        emailPrimary:{type: String, required: false, unique: true},
        emailSecondary:{type: String, required: false, default: null},
        phoneNumber:{type: String, required: false, default: null},
        photoUrl:{type: String, required: false, default: null},
        photoId:{type: String, required: false, default: null},
        update:{type: Date, required: false, default: null},
    },
    {

    }
);

const profile = mongoose.model("Profile", ProfileSchema);

module.exports = profile;