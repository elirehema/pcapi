const Schemas = require('../Schemas/customers.orders.schema');
const ComputerSchema = require('../Schemas/computers.schema')
const constants = require("../config/Constants");

exports.getAllOrders = async function (req, res) {
    await Schemas.find({})
    .populate({path: "productid", model: constants.COMPUTERS_COLLECTION})
        .exec(function (err, response) {
            if (err) {
                return res.json({
                    status: res.statusCode,
                    message: err.message,
                });
            }
            return res.json({
                status: res.statusCode,
                message: "Retrieved successfull",
                data: response
            });
        });
};
exports.getOrderById = async function (req, res) {
    await Schemas.findOne({_id: req.params.addressId})
        .exec(function (err, response) {
            if (err) {
                return res.json({
                    status: res.statusCode,
                    message: err.message,
                });
            }
            return res.json({response});
        });
};

exports.addNewOrderProductId = async function (req, res) {
    await ComputerSchema.findOne({_id: req.params.productid})
    .populate({path: "productid", model: constants.COMPUTERS_COLLECTION})
        .exec(function (error, response) {
            if (error) {
                return res.json({
                    message: error.message,
                    name: error.name,
                    kind: error.kind,
                    path: error.path,
                    reason: error.reason,
                    model: error.model
                })
            }
            //return res.json(response.address[0])
            var order = new Schemas();
            order.productid = response._id;
            order. username = req.body.username;
            order.userphone = req.body.userphone;
            order.usermail = req.body.usermail;
            
            order.save(function (err) {
                if (err) {
                    return res.json({status: res.statusCode, error: err.message});
                }
                res.json({
                    status: res.statusCode,
                    message: 'New User created succesfully!',
                    data: order
                });
            });


        });


};

exports.deleteOrderById = async function (req, res) {
    await Schemas.findOneAndRemove({_id: req.params.addressId})
        .exec(function (err, user) {
            if (err) {
                return res.json(err);
            }
            return res.json({
                status: res.statusCode,
                message: 'User deleted'
            });
        });
};
exports.deleteAddressByUserId = async function (req, res) {

};


