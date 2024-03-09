import mongoose from "mongoose";

// Conection with the database

const ConnectDB = async () =>{
    try {
        const conexion = await mongoose.connect(process.env.MONGO_URI);

        const url = `CONNECTED WITH THE MONGO DATABASE IN THE PORT ${conexion.connection.port}, AND IN THE HOST ${conexion.connection.host}`
        console.log(url);
    } catch (error) {
        console.log(error.message);
    }
}

export default ConnectDB;