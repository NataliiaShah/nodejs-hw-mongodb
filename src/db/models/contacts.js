import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    phoneNumber: {
        type: String,
        required: true,
    },

    email: {
        type: String,
    },

    isFavourite: {
        type: Boolean,
        default: false,
    },

    contactType: {
        type: String,
        required: true,
        enum: ["work", "home", "personal"],
        default: "personal",
    },
},
    {
    timestamps: true,
    versionKey: false,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
