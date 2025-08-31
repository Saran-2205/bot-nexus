import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    event:{
        type:String,
        required:true
    },
    prize:{
        type:String,
        required:true
    }
});

const Achievement = mongoose.model("Achievement",achievementSchema);

export default Achievement;