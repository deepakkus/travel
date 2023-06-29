var mongoose = require("mongoose");
const Trip = require("../../Models/trip");
var Upload = require("../../service/upload");
const {
    Validator
} = require("node-input-validator");
var uuidv1 = require("uuid").v1;
function createToken(data) {
    data.hase = uuidv1();
    return jwt.sign(data, "DonateSmile");
}
const create = async (req, res) => {
    const v = new Validator(req.body, {
        name: "required",
		description:"required"
    });
    let matched = await v.check().then((val) => val);
    if (!matched) {
        return res.status(200).send({
            status: false,
            error: v.errors
        });
    }
    let tripData = {
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
		createdOn: new Date(),
		description: req.body.description,
        image: req.body.image,
        
    };
    const trip = await new Trip(tripData);
    return trip
        .save()
        .then((data) => {
            return res.status(200).json({
                status: true,
                message: "New Trip Created successfully",
                data: data,
            });
        })
        .catch((error) => {
            res.status(200).json({
                status: false,
                message: "Server error. Please try again.",
                error: error,
            });
        });
};
const viewAll = async (req, res) => {
    return Trip.aggregate([{
                $match: {
                    isDelete: false
                }
            },
            {
                $project: {
                  token: 0,
                  __v: 0,
                }
            },
            {
                $sort: {
                    _id: -1
                }
            }
        ])
        .then((data) => {
            return res.status(200).json({
                status: true,
                message: "Get All Trip content  Successfully",
                data: data,
            });
        })
        .catch((error) => {
            res.status(200).json({
                status: false,
                message: "Server error. Please try again.",
                error: error,
            });
        });
};
const ImageUpload = async (req, res) => {
    let uploadDAta = await Upload.uploadFile(req, "trip");
    if (uploadDAta.status) {
        res.send(uploadDAta);
    } else {
        res.send(uploadDAta);
    }
}
module.exports = {
    create,
	viewAll,
    ImageUpload
};