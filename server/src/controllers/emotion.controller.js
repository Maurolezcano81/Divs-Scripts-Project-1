import Emotion from "../models/emotion.model.js";
import mongoose from "mongoose";
import { startOfDay, subDays, endOfDay } from "date-fns";

export const getAllEmotions = async (req, res) => {
  try {
    const emotions = await Emotion.find({ user: req.user.id }).sort(
      "-createdAt"
    );

    res.status(200).json(emotions);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las emociones', details: error.message });
  }
};

export const getEmotionsLast7Days = async (req, res) => {
  try {
    const today = new Date();
    const sevenDaysAgo = subDays(today, 7);

    const emotions = await Emotion.find({
      user: req.user.id,
      createdAt: {
        $gte: startOfDay(sevenDaysAgo),
        $lte: endOfDay(today),
      },
    }).sort("-createdAt");

    // Agrupar por día para el dashboard
    const groupedByDay = {};

    emotions.forEach((emotion) => {
      const day = emotion.createdAt.toISOString().split("T")[0];

      if (!groupedByDay[day]) {
        groupedByDay[day] = [];
      }

      groupedByDay[day].push(emotion);
    });

    res.status(200).json({
      emotions,
      groupedByDay,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las emociones de los últimos 7 días', details: error.message });
  }
};

export const createEmotion = async (req, res) => {
  try {
    const { mood, intensity, notes, tags } = req.body;

    if (!mood || intensity === undefined) {
      return res
        .status(400)
        .json({ message: 'El estado de ánimo e intensidad son obligatorios' });
    }

    // Validación de estado de ánimo
    const validMoods = ['feliz', 'triste', 'ansioso', 'calmado', 'enojado', 'energético', 'cansado', 'neutral'];
    if (!validMoods.includes(mood)) {
      return res.status(400).json({
        message: 'Estado de ánimo no válido. Los valores permitidos son: feliz, triste, ansioso, calmado, enojado, energético, cansado, neutral'
      });
    }

    // Validar rango de intensidad
    const intensityNum = Number(intensity);
    if (isNaN(intensityNum) || intensityNum < 1 || intensityNum > 10 || !Number.isInteger(intensityNum)) {
      return res.status(400).json({
        message: 'La intensidad debe ser un número entero entre 1 y 10'
      });
    }

    const newEmotion = await Emotion.create({
      user: req.user.id,
      mood,
      intensity: intensityNum,
      notes: notes || "",
      tags: tags || [],
    });

    res.status(201).json(newEmotion);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la emoción', details: error.message });
  }
};

export const getEmotionById = async (req, res) => {
  try {
    const emotion = await Emotion.findOne({
      id: req.params.id,
      user: req.user.id,
    });

    if (!emotion) {
      return res.status(404).json({ message: 'Emoción no encontrada' });
    }

    res.status(200).json(emotion);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la emoción', details: error.message });
  }
};

export const updateEmotion = async (req, res) => {
  try {
    const { mood, intensity } = req.body;

    if (mood) {
      const validMoods = ['feliz', 'triste', 'ansioso', 'calmado', 'enojado', 'energético', 'cansado', 'neutral'];
      if (!validMoods.includes(mood)) {
        return res.status(400).json({
          message: 'Estado de ánimo no válido. Los valores permitidos son: feliz, triste, ansioso, calmado, enojado, energético, cansado, neutral'
        });
      }
    }

    if (intensity !== undefined) {
      const intensityNum = Number(intensity);
      if (isNaN(intensityNum) || intensityNum < 1 || intensityNum > 10 || !Number.isInteger(intensityNum)) {
        return res.status(400).json({
          message: 'La intensidad debe ser un número entero entre 1 y 10'
        });
      }
    }

    const emotion = await Emotion.findOneAndUpdate(
      { id: req.params.id, user: req.user.id },
      { mood, intensity },
      { new: true, runValidators: true }
    );

    if (!emotion) {
      return res.status(404).json({ message: 'Emoción no encontrada' });
    }

    res.status(200).json(emotion);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la emoción', details: error.message });
  }
};

export const deleteEmotion = async (req, res) => {
  try {
    const emotion = await Emotion.findOneAndDelete({
      id: req.params.id,
      user: req.user.id,
    });

    if (!emotion) {
      return res.status(404).json({ message: 'Emoción no encontrada' });
    }

    res.status(200).json({ message: 'Emoción eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la emoción', details: error.message });
  }
};
