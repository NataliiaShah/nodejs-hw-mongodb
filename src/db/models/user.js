import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            email: true,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
  },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        },
        versionKey: false
    },
);

export const UsersCollection = model('User', usersSchema);


