'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    id: {
        type: String,
        unique : true,
        required: 'User ID is necessary'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    data: {
        type: Object,
        default: {}
    }
});

module.exports = mongoose.model('Users', UserSchema);
