import  Express  from "express";
import dotenv from "dotenv";
import GetAudio from "./middlewares/GetAudio.js";
import cors from "cors";
import UploadAudio from './middlewares/uploadaudio.js';
dotenv.config();

const App=Express();
const Port=process.env.PORT;

App.use(Express.json());
App.use(cors())
App.post("/postar",UploadAudio);
App.get("/",GetAudio)

App.listen(Port,()=>{
    console.log(`Servidor Rodando Na http://localhost:${Port}`)
})