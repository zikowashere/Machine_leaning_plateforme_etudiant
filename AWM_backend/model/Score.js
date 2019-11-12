let mongoose = require('mongoose');

let Score = mongoose.model('Score', {
    score: Number,
    answer:[],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: Date,
});

module.exports = Score;
