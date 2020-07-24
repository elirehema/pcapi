var mongoose = require('mongoose');
const constants = require("../config/Constants");
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var ComputersSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true,
        default: "Default"
    },
    manufacture: {
        type: String,
        required: true,
        default: "0.0"
    },
    ram: {
        type: String,
        required: true,
        default: "0.0"
    },
    os: {
        type: String,
        required: true,
        default: "Window"
    },
    color: {
        type: String,
        required: true,
        default: "Black"
    },
    description: {
        type: String,
        required: true,
        default: ""
    },
    price:{
        type:String,
        required:true,
        default:'0.0'
    },
    thumbnail: {
        type: String,
        required: true,
        default: "https://www.kindpng.com/picc/m/437-4371926_razer-blade-pro-17-inch-gaming-laptop-512gb.png"
    },


    images: {
        type: Array,
        required: false
    },
    usbs: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    }

});

var ComputerSchemas = module.exports = mongoose.model(constants.COMPUTERS_COLLECTION, ComputersSchema);
