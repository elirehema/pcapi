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
        description: req.body.description
      
    });
    // save the user and check for errors
    await pc.save(function (err) {
        if (err) {
            return res.json({status: err.statusCode, error: err.message});
        }
        res.json(pc);
    });
};

