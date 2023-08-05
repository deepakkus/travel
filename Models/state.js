var mongoose = require('mongoose');

const StateSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    createdOn: {
        type: String,
        required: true,
    },
    isDelete: {
        type: Boolean,
        required: false,
        default: false
      }
});

module.exports = mongoose.model('State', StateSchema);