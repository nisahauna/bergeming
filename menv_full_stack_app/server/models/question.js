const mongoose = require('mongoose');

const postQuestion = mongoose.Schema({
    question : String
});
module.exports = mongoose.model("Question", postQuestion);
