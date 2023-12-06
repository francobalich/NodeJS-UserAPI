import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN)
        console.log("Base de datos esta conectada");
    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar base de datos.')
    }
}