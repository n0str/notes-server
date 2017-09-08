'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var NoteSchema = new Schema({
    note_id: {
        type: String,
        unique : true,
        required: 'Note ID is required'
    },
    user_id: {
        type: String,
        required: 'Author ID is required'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    data: {
        type: Object,
        required: 'Note content is required'
    }
});

module.exports = mongoose.model('Notes', NoteSchema);
