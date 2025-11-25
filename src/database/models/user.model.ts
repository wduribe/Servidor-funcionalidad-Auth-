import { Document, model, Schema, Types } from "mongoose";

type Role = 'ADMIN_ROLE' | 'USER_ROLE';

interface Img {
    url: string,
    publicId: string,
}

export interface IUSER extends Document {
    id: Types.ObjectId,
    email: string,
    password: string,
    name: string,
    confirmed: boolean,
    role: Role,
    img: Img,

    //* TODO --> crear atributo que guarde los pedidosS

}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: String,
    },
    name: {
        type: String,
        required: true,
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    role: {
        type: [String],
        default: ['USER_ROLE'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    img: {
        type: Object,
        default: {
            url: '',
            publicId: '',
        }
    }

    //* TODO --> crear atributo que guarde los pedidos

});

export const UserModel = model<IUSER>('User', userSchema);