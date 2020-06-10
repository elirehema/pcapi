  
const router = require("express").Router();
const Order = require("../models/order");
const verifyToken = require("../middlewares/verify-token");


//GET - Get all the orders of a specific user
router.get("/orders", verifyToken, async (req, res) => {
  try {
    let products = await Order.find({ owner: req.decoded._id })
      .deepPopulate("owner products.productID.owner owner.address")
      .exec();

    res.json({
      success: true,
      products: products
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

//POST - create an order
router.post("/orders", verifyToken, async(req, res) => {
      let order = new Order(); 
      let cart = req.body.cart;

      cart.map(product => {
        order.products.push({
          productID: product._id,
          quantity: parseInt(product.quantity),
          price: product.price
        });
      });
      order.owner = req.decoded._id;
      order.estimatedDelivery = req.body.estimatedDelivery;
      order.totalPrice = req.body.totalPrice;
      order.country = req.body.country;
      order.fullName = req.body.fullName;
      order.houseNumber = req.body.houseNumber;
      order.streetAddress = req.body.streetAddress;
      order.city = req.body.city;
      order.state = req.body.state;
      order.pincode = req.body.pincode;
      order.phoneNumber = req.body.phoneNumber;
      order.deliveryInstructions = req.body.deliveryInstructions;
      order.securityCode = req.body.securityCode;

      await order.save();

      res.json({
        success: true,
        message: "Successfully made an order"
      });
});

//GET - get all the orders for the admin
router.get("/order",  async(req,res)=>{
  try{
      let order = await Order.find().populate("owner products.productID").exec();
      res.json({
          success: true,
          order: order
      })
  } catch (err) {
      res.status(500).json({
          success: false,
          message: err.message
      })
  }
}); 

module.exports = router;