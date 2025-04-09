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
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
};

export const createEmotion = async (req, res) => {
  try {
    const { mood, intensity } = req.body;

    if (!mood || !intensity) {
      return res
        .status(400)
        .json({ message: "Mood and intensity are required" });
    }

    const newEmotion = await Emotion.create({
      user: req.user.id,
      mood,
      intensity,
      notes: notes || "",
      tags: tags || [],
    });

    res.status(201).json(newEmotion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmotionById = async (req, res) => {
  try {
    const emotion = await Emotion.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!emotion) {
      return res.status(404).json({ message: "Emotion not found" });
    }

    res.status(200).json(emotion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEmotion = async (req, res) => {
  try {
    const { mood, intensity } = req.body;

    const emotion = await Emotion.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { mood, intensity },
      { new: true, runValidators: true }
    );

    if (!emotion) {
      return res.status(404).json({ message: "Emotion not found" });
    }

    res.status(200).json(emotion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEmotion = async (req, res) => {
  try {
    const emotion = await Emotion.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!emotion) {
      return res.status(404).json({ message: "Emotion not found" });
    }

    res.status(200).json({ message: "Emotion deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
