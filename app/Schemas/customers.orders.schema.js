var mongoose = require('mongoose');

const constants = require("../config/Constants");
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var CustomerOrdersSchema = new Schema({
    username: {
        type: String,
        required: true,
        default: ""
    },
   userphone: {
        type: String,
        required: true,
        default: 0
    },
    usermail: {
        type: String,
        required: true,
        default:""
    },
    productid:{ type: Schema.Types.ObjectId, ref: constants.COMPUTERS_COLLECTION}

});

var CustomerOrders = module.exports = mongoose.model(constants.ORDERS_COLLECTION, CustomerOrdersSchema);
