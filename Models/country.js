var mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
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

module.exports = mongoose.model('Country', CountrySchema);