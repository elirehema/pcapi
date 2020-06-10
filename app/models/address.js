const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User"},
    country: String,
    fullName: String,
    houseNumber: String,
    streetAddress: String,
    city: String,
    state: String,
    pincode: Number,
    phoneNumber: Number,
    deliveryInstructions: String,
    securityCode: String
});


module.exports = mongoose.model("Address", AddressSchema);