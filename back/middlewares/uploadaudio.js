import { Audio } from "../connection/connection.js";

async function UploadAudio(req,res){
   
    try {
        const {uri}=req.body
        const newAudio=new Audio ({uri})
        await newAudio.save()
        res.send("Sucesso!")
    } catch (error) {
        console.log(error);
        res.status(400).send("Erro")
    }
}
export default UploadAudio