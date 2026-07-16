import mongoose from 'mongoose';
const leaderboardEntrySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
}, { timestamps: true });
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardEntrySchema, 'leaderboard');
