import {Schema, model} from "mongoose"

const newItemSchema = new Schema({
    title : String,
    imgurl : String,
    prize : String,
    delprize : String ,
    offper : String
}, { timestamps: true },{Location:true})

const Newitem = model("Newitem", newItemSchema)

export default Newitem