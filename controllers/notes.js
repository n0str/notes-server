'use strict';


var mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    Note = mongoose.model('Notes');

/**
 * Show note IDs for the user specified
 */
exports.list_all_notes = function(req, res) {
    let user_id = req.params.user_id;

    Note.find({'user_id': user_id}, function (err, notes) {
        var note_ids = [];
        notes.forEach(function (note, index, arr) {
            note_ids.push(note.note_id);
        });
        res.send({'result': 'success', 'data': {'notes': note_ids}});
    });
};


/**
 * Insert or Update a note by user ID and note ID
 */
exports.update_note = function(req, res) {

    let user_id = req.params.user_id,
        note_id = req.params.note_id,
        data    = req.body;

    User.findOne({id: user_id}, function(err, user) {
        if (!user)
            new User({'id': user_id}).save(function (err, user) {
                if (err) {
                    res.send({'result': 'error', 'data': err});
                    Promise.reject();
                }
                console.log("+ user created.", user_id)
            });
        else {
            console.log("+ user found.", user_id)
        }
    })
    .then(function () {
        return Note.updateOne(
            {user_id: user_id, note_id: note_id},
            {user_id: user_id, note_id: note_id, data: data},
            {upsert: true, setDefaultsOnInsert: true})
    })
    .then(function () {
        console.log("+ note updated.", note_id);
        res.send({'result': 'success'});
    })
    .catch(function (error) {
        console.log("- rejection.");
        // TODO: parse error types
        res.send({'result': 'error', 'data': {}});
    });


};