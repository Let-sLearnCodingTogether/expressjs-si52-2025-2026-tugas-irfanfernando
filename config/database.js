import mongoose from "mongoose";

const database = async () => {
    try{
        console.log("Menghubungkan ke MongoDB...");

        const response = await mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.8");

        console.log(`Koneksi ke MongoDB berhasil host : ${response.connection.host}`);
    } catch (error){
        console.error("Gagal terkoneksi dengan MongoDB");
        console.error(error.message);
        process.exit(1);
    }

}

export default database;