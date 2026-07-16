import { Router } from 'express';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';
const router = Router();
router.get('/users/', async (_req, res, next) => {
    try {
        const users = await User.find().sort({ name: 1 });
        res.json({ users });
    }
    catch (error) {
        next(error);
    }
});
router.get('/teams/', async (_req, res, next) => {
    try {
        const teams = await Team.find().populate('members', 'name email').sort({ name: 1 });
        res.json({ teams });
    }
    catch (error) {
        next(error);
    }
});
router.get('/activities/', async (_req, res, next) => {
    try {
        const activities = await Activity.find()
            .populate('user', 'name email')
            .sort({ activityDate: -1 });
        res.json({ activities });
    }
    catch (error) {
        next(error);
    }
});
router.get('/leaderboard/', async (_req, res, next) => {
    try {
        const leaderboard = await LeaderboardEntry.find()
            .populate('user', 'name email')
            .populate('team', 'name')
            .sort({ rank: 1 });
        res.json({ leaderboard });
    }
    catch (error) {
        next(error);
    }
});
router.get('/workouts/', async (_req, res, next) => {
    try {
        const workouts = await Workout.find().sort({ difficulty: 1, title: 1 });
        res.json({ workouts });
    }
    catch (error) {
        next(error);
    }
});
export default router;
