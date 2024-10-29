import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const ip=process.env.IP

mongoose.connect(ip);

const Conn=mongoose.connection;

const Audio=Conn.model("Audios2",{
    uri:{type:String},
    time:{type:String}
})

export {Audio}