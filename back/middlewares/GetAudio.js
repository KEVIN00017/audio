import { Audio } from "../connection/connection.js";
const GetAudio= async(req,res)=>{
try {

const files = await Audio.find();

    res.send(files)
} catch (error) {
    console.log(error)
    res.status(400).send("Erro!")
}
}
export default GetAudio