var mongoose = require("mongoose");
const Country = require("../../Models/country");
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
        name: "required"
    });
    let matched = await v.check().then((val) => val);
    if (!matched) {
        return res.status(200).send({
            status: false,
            error: v.errors
        });
    }
    let countryData = {
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
		createdOn: new Date()
    };
    const country = await new Country(countryData);
    return country
        .save()
        .then((data) => {
            return res.status(200).json({
                status: true,
                message: "New Country Created successfully",
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

    return Country.findOneAndUpdate(
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
            message: "Country Content update successful",
            data: data,
          });
        } else {
          return res.status(500).json({
            status: false,
            message: "Country Content not match",
            data: null,
          });
        }
      }
    );
  };
  const Delete = async (req, res) => {
    return Country.findOneAndUpdate(
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
            message: "Country Content Delete successfully",
            data: data,
          });
        } else {
          return res.status(500).json({
            status: false,
            message: "Country does not match",
            data: null,
          });
        }
      }
    );
  }

  const viewSingel = async (req, res) => {
    return Country.aggregate([{
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
                    message: "Get Single Country Successfully",
                    data: data[0],
                });
            } else {
                return res.status(200).json({
                    status: false,
                    message: "No Country Found",
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
    return Country.aggregate([{
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
                message: "Get All Country content  Successfully",
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

module.exports = {
  create,
	update,
	Delete,
	viewSingel,
	viewAll
};