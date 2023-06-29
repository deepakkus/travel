var mongoose = require('mongoose');
var passwordHAsh = require('password-hash');

const TripSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    createdOn: {
        type: String,
        required: true,
    },
	description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    isDelete: {
        type: Boolean,
        required: false,
        default: false
      }
});

module.exports = mongoose.model('Trip', TripSchema);