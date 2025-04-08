import { endOfDay, startOfDay, subDays } from 'date-fns';
import Activity from '../models/activity.model.js';
import Emotion from '../models/emotion.model.js';
import Note from '../models/note.model.js';

export const getDashboardData = async (req, res) => {
  try {
    const today = new Date();
    const sevenDaysAgo = subDays(today, 7);

    const emotions = await Emotion.find({
      user: req.user.id,
      createdAt: {
        $gte: startOfDay(sevenDaysAgo),
        $lte: endOfDay(today)
      }
    }).sort('createdAt');

    const recentActivities = await Activity.find({ user: req.user.id })
      .sort('-createdAt')
      .limit(5);

    const recentNotes = await Note.find({ user: req.user.id })
      .sort('-createdAt')
      .limit(5);

    const emotionsByDay = {};
    const last7Days = [];

    for (let i = 6; i >= 0; i--) {
      const date = subDays(today, i);
      const dateStr = date.toISOString().split('T')[0];
      last7Days.push(dateStr);
      emotionsByDay[dateStr] = [];
    }

    emotions.forEach(emotion => {
      const day = emotion.createdAt.toISOString().split('T')[0];
      if (emotionsByDay[day]) {
        emotionsByDay[day].push(emotion);
      }
    });

    const moodIntensityByDay = last7Days.map(day => {
      const dayEmotions = emotionsByDay[day] || [];
      const moodCounts = {};
      const moodIntensities = {};

      dayEmotions.forEach(emotion => {
        if (!moodCounts[emotion.mood]) {
          moodCounts[emotion.mood] = 0;
          moodIntensities[emotion.mood] = 0;
        }
        moodCounts[emotion.mood]++;
        moodIntensities[emotion.mood] += emotion.intensity;
      });

      const moodAverages = {};
      Object.keys(moodCounts).forEach(mood => {
        moodAverages[mood] = moodIntensities[mood] / moodCounts[mood];
      });

      return {
        date: day,
        emotions: dayEmotions,
        moodAverages
      };
    });

    res.status(200).json({
      emotionsSummary: moodIntensityByDay,
      recentActivities,
      recentNotes,
      last7Days
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};