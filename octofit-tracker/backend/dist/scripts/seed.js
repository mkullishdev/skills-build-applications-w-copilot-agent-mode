import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            Activity.deleteMany({}),
            LeaderboardEntry.deleteMany({}),
            Team.deleteMany({}),
            User.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.insertMany([
            {
                name: 'Mona Patel',
                email: 'mona.patel@example.com',
                role: 'Team Captain',
                age: 34,
                fitnessGoal: 'Improve endurance',
            },
            {
                name: 'Jordan Smith',
                email: 'jordan.smith@example.com',
                role: 'Member',
                age: 28,
                fitnessGoal: 'Build strength',
            },
            {
                name: 'Avery Chen',
                email: 'avery.chen@example.com',
                role: 'Member',
                age: 31,
                fitnessGoal: 'Increase mobility',
            },
            {
                name: 'Sam Rivera',
                email: 'sam.rivera@example.com',
                role: 'Coach',
                age: 39,
                fitnessGoal: 'Maintain conditioning',
            },
        ]);
        const teams = await Team.insertMany([
            {
                name: 'Octo Sprinters',
                motto: 'Eight arms, one finish line',
                members: [users[0]._id, users[1]._id],
            },
            {
                name: 'Core Crushers',
                motto: 'Steady reps, stronger days',
                members: [users[2]._id, users[3]._id],
            },
        ]);
        await Activity.insertMany([
            {
                user: users[0]._id,
                type: 'Trail Run',
                durationMinutes: 45,
                caloriesBurned: 430,
                activityDate: new Date('2026-07-10T13:30:00.000Z'),
            },
            {
                user: users[1]._id,
                type: 'Strength Training',
                durationMinutes: 55,
                caloriesBurned: 510,
                activityDate: new Date('2026-07-11T16:00:00.000Z'),
            },
            {
                user: users[2]._id,
                type: 'Yoga Flow',
                durationMinutes: 35,
                caloriesBurned: 180,
                activityDate: new Date('2026-07-12T11:15:00.000Z'),
            },
            {
                user: users[3]._id,
                type: 'Cycling',
                durationMinutes: 60,
                caloriesBurned: 620,
                activityDate: new Date('2026-07-13T12:45:00.000Z'),
            },
        ]);
        await LeaderboardEntry.insertMany([
            { user: users[3]._id, team: teams[1]._id, points: 980, rank: 1 },
            { user: users[0]._id, team: teams[0]._id, points: 920, rank: 2 },
            { user: users[1]._id, team: teams[0]._id, points: 875, rank: 3 },
            { user: users[2]._id, team: teams[1]._id, points: 810, rank: 4 },
        ]);
        await Workout.insertMany([
            {
                title: 'Tempo Builder Run',
                focusArea: 'Cardio',
                difficulty: 'Intermediate',
                durationMinutes: 40,
                recommendedForGoal: 'Improve endurance',
            },
            {
                title: 'Full-Body Dumbbell Circuit',
                focusArea: 'Strength',
                difficulty: 'Intermediate',
                durationMinutes: 45,
                recommendedForGoal: 'Build strength',
            },
            {
                title: 'Recovery Mobility Reset',
                focusArea: 'Mobility',
                difficulty: 'Beginner',
                durationMinutes: 25,
                recommendedForGoal: 'Increase mobility',
            },
            {
                title: 'Coach Sam Conditioning Ladder',
                focusArea: 'Conditioning',
                difficulty: 'Advanced',
                durationMinutes: 50,
                recommendedForGoal: 'Maintain conditioning',
            },
        ]);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
