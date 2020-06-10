// Import product model
const Computers = require('../Schemas/computers.schema');
const constants = require("../config/Constants");


/**Get All {@link Apartments} in the system no authentication required**/
exports.getAllComputers = async function (req, res) {
    await Computers.find({}).sort('-createdDate')
       .exec(function (err, response) {
            if (err) {
                return res.json({
                    status: res.status(),
                    message: err,
                });
            }
            return res.json({
                status: res.statusCode,
                message: "Product retrieved successfully",
                data: response
            });
        });
};

/**Create new {@link computers} with request from body object, ``Authentication is Mandatory` **/
exports.updatePcItem = async function (req, res) {
    await Computers.findOne({_id: req.body.pcid})
    .exec(function(error, response){
        if (error) {
             return res.json({
                message: error.message,
                name: error.name,
                kind: error.kind,
                path: error.path,
                reason: error.reason,
                model: error.model
            });
        }
           
    

    var apartment = new Apartments();
        apartment.apartmentName = req.body.name;
        apartment.apartmentType = req.body.type;
        apartment.longitude = req.body.longitude;
        apartment.latitude = req.body.latitude;
        apartment.paymentTerms = req.body.terms;
        apartment.location = req.body.location;
        apartment.ownersInfo = response._id;
        apartment.amount = req.body.amount;
        apartment.description = req.body.description;
        apartment.thumbNail = req.body.image;
        apartment.roomImages = req.body.images;
     apartment.save(function (error) {
        if (error) {
            return res.json({
                message: error.message,
                name: error.name,
                kind: error.kind,
                path: error.path,
                reason: error.reason,
                model: error.model
            });
        }
        return res.json({
            status: res.statusCode,
            message: 'New User created succesfully!',
            data: apartment
        });
    });
    });

};

exports.createNewComputer = async function (req, res, next) {
   
    const pc = new Computers({
        name: req.body.name,
        type: req.body.type,
        manufacture: req.body.manufacture,
        ram: req.body.ram,
        os:req.body.os,
        color: req.body.color,
        thumbnail: req.body.thumbnail,
        images: req.body.images,
        description: req.body.description,
        usbs: req.body.usbs,
        price: req.body.price
      
    });
    // save the user and check for errors
    await pc.save(function (err) {
        if (err) {
            console.log(err.errors);
            return res.json({status: 400, message: err.message});
        }
        res.json(pc);
    });
};

exports.updateComputerById = async function (req, res) {
    await Computers.findById(req.params.pcid, function (err, computer) {
        if (err) {
            return res.json({ status: res.statusCode, message: err.message });
        } 

            computer.name = req.body.name ? req.body.name : computer.name;
            computer.type = req.body.type ? req.body.type : computer.type;
            computer.manufacture = req.body.manufacture ? req.body.manufacture : computer.manufacture;
            computer.ram = req.body.ram ? req.body.ram : computer.ram;
            computer.os = req.body.os ? req.body.os : computer.os;
            computer.color = req.body.color ? req.body.color : computer.color;
            computer.thumbnail = req.body.thumbnail ? req.body.thumbnail: computer.thumbnail;
            computer.images = req.body.images ? req.body.images : computer.images;
            computer.description = req.body.description ? req.body.description : computer.description;
            computer.usbs = req.body.usbs ? req.body.usbs : computer.usbs;
            computer.price = req.body.price ? req.body.price : computer.price;

           
            computer.save(function (err) {
                if (err) {
                    return res.json({ status: res.statusCode, error: err.message });
                }
                return res.json(computer);
            });
        


    });
};
exports.deleteComputerById = async function (req, res) {
    await Computers.findOneAndRemove({_id: req.params.pcid})
        .exec(function (err, user) {
            if (err) {
                return res.json(err);
            }
            return res.json({
                status: res.statusCode,
                message: 'Item deleted'
            });
        });
};
