import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
    {
        itemName :{
            type: String,
            trim: true,
            required: true
        },

        quantity:{
            type: Number,
            required: true,
            default:1
        },

        purchased:{
            type: Boolean,
            required: true,
            default:false
        },
    },
    {
        timestamps: true
    }
);

const itemModel =new mongoose.model("items", itemSchema);
export default itemModel;