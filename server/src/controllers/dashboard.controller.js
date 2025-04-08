import Activity from "../models/activity.model";
import Emotion from "../models/emotion.model";
import Note from "../models/note.model";

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

    // Obtener las últimas notas
    const recentNotes = await Note.find({ user: req.user.id })
      .sort('-createdAt')
      .limit(5);

    // Procesar datos de emociones para gráficos
    const emotionsByDay = {};
    const last7Days = [];

    // Crear array con los últimos 7 días
    for (let i = 6; i >= 0; i--) {
      const date = subDays(today, i);
      const dateStr = date.toISOString().split('T')[0];
      last7Days.push(dateStr);
      emotionsByDay[dateStr] = [];
    }

    // Agrupar emociones por día
    emotions.forEach(emotion => {
      const day = emotion.createdAt.toISOString().split('T')[0];
      if (emotionsByDay[day]) {
        emotionsByDay[day].push(emotion);
      }
    });

    // Calcular promedios de intensidad por día y tipo de emoción
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