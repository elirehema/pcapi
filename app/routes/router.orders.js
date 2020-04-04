// route-address.js
// Initialize express router

let router = require('express').Router();
// Initialize express router
const auth = require('../middleware/auth');
// Import contact controller
var Controller = require('../controllers/controller.orders');
// Contact routes
router.route('/orders')
    .get(Controller.getAllOrders);

router.route('/orders/:productid')
    .post(Controller.addNewOrderProductId);
    
router.route('/orders/:orderid')
    .get(Controller.getOrderById)
    .delete(auth, Controller.deleteOrderById);

module.exports = router;