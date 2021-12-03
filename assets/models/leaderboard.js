const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaderboardSchema = new Schema(
    {
        name: String,
        usersAndScores: [
            {
                user:
                {
                    type: Schema.Types.ObjectId,
                    ref: 'User'  
                },
                score: Number
            }
        ]
    }
);

const leaderboardModel = mongoose.model('Leaderboard', leaderboardSchema);
module.exports = leaderboardModel;