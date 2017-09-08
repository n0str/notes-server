'use strict';

module.exports = function(app) {
    let notes = require('./controllers/notes');

    app.route('/notes/:user_id')
        .get(notes.list_all_notes);

    app.route('/note/:user_id/:note_id')
        .post(notes.update_note);

};