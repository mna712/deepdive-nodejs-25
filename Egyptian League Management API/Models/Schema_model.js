
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TeamSchema = new Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    stadium: { type: String, required: true },
    foundedYear: { type: Number, required: true }
});

const Team = mongoose.model('Team', TeamSchema);

const MatchSchema = new Schema({
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    matchDate: { type: Date, required: true },
    score: { type: String, required: true }
});

const Match = mongoose.model('Match', MatchSchema);

module.exports = {
    Team,
    Match
}

