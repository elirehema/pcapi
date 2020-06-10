const router = require('express').Router();
var moment = require('moment');
const verifyToken = require("../middlewares/verify-token");
const Order = require('../models/order');
 

const SHIPMENT = {
    normal: {
        price: 50,
        days: 7
    },
    fast: {
        price: 150,
        days: 3
    }
}

function shipmentPrice(shipmentOption) {
    let estimated = moment().add(shipmentOption.days, "d").format("dddd MMM Do");

    return { estimated, price: shipmentOption.price}
}

router.post('/shipment',  (req,res) => {
    let shipment;
    if(req.body.shipment === "normal")
    {
        shipment= shipmentPrice(SHIPMENT.normal);
    } else{
        shipment= shipmentPrice(SHIPMENT.fast);
    }

    res.json({success: true, shipment: shipment});
});


module.exports = router;