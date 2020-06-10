const router = require('express').Router();
const Address = require('../models/address');
const User = require('../models/user');
const verifyToken = require('../middlewares/verify-token');
const axios = require("axios");


// POST API - Create an  address
router.post("/addresses",verifyToken, async (req,res) => {
    try{
        let address = new Address();
        address.user = req.decoded._id;
        address.country = req.body.country;
        address.fullName = req.body.fullName;
        address.houseNumber = req.body.houseNumber;
        address.streetAddress = req.body.streetAddress;
        address.city = req.body.city;
        address.state = req.body.state;
        address.pincode = req.body.pincode;
        address.phoneNumber = req.body.phoneNumber;
        address.deliveryInstructions = req.body.deliveryInstructions;
        address.securityCode = req.body.securityCode;

        await address.save();

        res.json({
            success: true,
            message: "Successfully added Address"
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

// GET API - Show all the addresses of a user
router.get("/addresses", verifyToken, async(req,res) => {
    try{
        let addresses = await Address.find({ user: req.decoded._id});
        
        res.json({
            success: true,
            addresses: addresses
        }); 
    } catch {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

// GET COUNTRIES API
router.get("/countries", async(req,res) => {
    try{
        let response = await axios.get("https://restcountries.eu/rest/v2/all");

        res.json(response.data);
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

/* GET API - update an address */
router.get("/addresses/:id", verifyToken, async (req, res) => {
    try {
      let address = await Address.findOne({ _id: req.params.id });
  
      res.json({
        success: true,
        address: address
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  });


// PUT API - Update address
router.put("/addresses/:id",verifyToken, async(req,res)=> {
    try{
        let foundAddress = await Address.findOne({user: req.decoded._id, _id: req.params.id});
        if(foundAddress){

        if(req.body.fullName)   foundAddress.fullName = req.body.fullName;
        if(req.body.country)    foundAddress.country = req.body.country;
        if(req.body.houseNumber)    foundAddress.houseNumber = req.body.houseNumber;
        if(req.body.streetAddress)    foundAddress.streetAddress = req.body.streetAddress;
        if(req.body.city)    foundAddress.city = req.body.city;
        if(req.body.state)    foundAddress.state = req.body.state;
        if(req.body.pincode)    foundAddress.pincode = req.body.pincode;
        if(req.body.phoneNumber)    foundAddress.phoneNumber = req.body.phoneNumber;
        if(req.body.deliveryInstructions)    foundAddress.deliveryInstructions = req.body.deliveryInstructions;
        if(req.body.securityCode)    foundAddress.securityCode = req.body.securityCode;

        await foundAddress.save();

        res.json({
            success: true,
            message: "Successfully updated the address"
        })

        }
    } catch (err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});


// DELETE API - delete address
router.delete("/addresses/:id", verifyToken, async(req,res) => {
    try{
        let deletedAddress = await Address.remove({ user: req.decoded._id, _id: req.params.id});
        if(deletedAddress){
            res.json({
                success: true,
                message: "Address has been deleted"
            })
        }
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

// PUT API - Set an adddress as default
router.put("/addresses/set/default", verifyToken, async(req,res) => {
    try {
        const updatedAddressUser = await User.findOneAndUpdate({_id: req.decoded._id}, {$set: {address: req.body.id}});
        if(updatedAddressUser){
            res.json({
                success: true,
                message: "Successfully set this address as default"
            })
        }
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

module.exports = router;
