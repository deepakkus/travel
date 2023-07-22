var mongoose = require("mongoose");
const Banner = require("../../Models/banner");
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
    let bannerData = {
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
		createdOn: new Date(),
		description: req.body.description,
        image: req.body.image,
        
    };
    const banner = await new Banner(bannerData);
    return banner
        .save()
        .then((data) => {
            return res.status(200).json({
                status: true,
                message: "New Banner Created successfully",
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
const update = async (req, res) => {

    return Banner.findOneAndUpdate(
      { _id: { $in: [mongoose.Types.ObjectId(req.params.id)] } },
      req.body,
      async (err, data) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Server error. Please try again.",
            error: err,
          });
        } else if (data != null) {
          data = { ...data._doc, ...req.body };
          return res.status(200).json({
            status: true,
            message: "Banner Content update successful",
            data: data,
          });
        } else {
          return res.status(500).json({
            status: false,
            message: "Banner Content not match",
            data: null,
          });
        }
      }
    );
  };
  const Delete = async (req, res) => {
    return Banner.findOneAndUpdate(
      { _id: { $in: [mongoose.Types.ObjectId(req.params.id)] } },
      {
        isDelete: true
      },
      async (err, data) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Server error. Please try again.",
            error: err,
          });
        } else if (data != null) {
          return res.status(200).json({
            status: true,
            message: "Banner Content Delete successfully",
            data: data,
          });
        } else {
          return res.status(500).json({
            status: false,
            message: "Banner does not match",
            data: null,
          });
        }
      }
    );
  }

  const viewSingel = async (req, res) => {
    return Banner.aggregate([{
                $match: {
                    _id: mongoose.Types.ObjectId(req.params.id)
                }
            },
            
            {
                $project: {
                    "token": 0,
                    __v: 0,
                },
            },
            {
                $sort: {
                    _id: -1
                }
            }
        ])
        .then((data) => {
            if (data && data.length > 0) {
                return res.status(200).json({
                    status: true,
                    message: "Get Single Banner Successfully",
                    data: data[0],
                });
            } else {
                return res.status(200).json({
                    status: false,
                    message: "No Banner Found",
                    data: null,
                });
            }

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
    return Banner.aggregate([{
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
                message: "Get All Banner content  Successfully",
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
    let uploadDAta = await Upload.uploadFile(req, "banner");
    if (uploadDAta.status) {
        res.send(uploadDAta);
    } else {
        res.send(uploadDAta);
    }
}

module.exports = {
  create,
	update,
	Delete,
	viewSingel,
	viewAll,
  ImageUpload
};