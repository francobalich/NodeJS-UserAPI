import { Schema, model } from "mongoose";

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    images: {
        type: [String],
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

export const Usuario = model('Usuario', UsuarioSchema)