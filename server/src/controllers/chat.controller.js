import mongoose from 'mongoose';
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import { generateAIResponse } from "../utils/ai-utils.js";
import { createChatSystemPrompt } from "../utils/chat-preamble.js";

export const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user.id });
    res.status(200).json(chats);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los chats", details: error.message });
  }
};

export const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!chat) {
      return res.status(404).json({ message: "Chat no encontrado" });
    }
    res.status(200).json(chat);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el chat", details: error.message });
  }
};

export const createChat = async (req, res) => {
  try {
    const { initialMessage } = req.body;
    const userId = req.user.id;

    console.log("Creating chat for user:", userId);

    const user = await User.findById(userId).lean();

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await populateUserData(user);

    console.log("User data for preamble:", JSON.stringify({
      name: user.name,
      temperament: user.temperament,
      archetype: user.archetype
    }));

    const initialMessages = [];
    const systemPrompt = createChatSystemPrompt(user);

    console.log("System prompt length:", systemPrompt.length);

    initialMessages.push({
      role: "system",
      content: systemPrompt,
    });

    const newChat = await Chat.create({
      title: "Nueva Conversación",
      messages: initialMessages,
      user: userId,
    });

    if (initialMessage && initialMessage.trim().length > 0) {
      newChat.messages.push({
        role: "user",
        content: initialMessage,
      });
      try {
        const aiResponse = await generateAIResponse(newChat.messages, userId);
        newChat.messages.push({
          role: "assistant",
          content: aiResponse,
        });
        await newChat.save();
      } catch (error) {
        console.error("Error al generar respuesta inicial:", error);
        await newChat.save();
      }
    }
    res.status(201).json(newChat);
  } catch (error) {
    console.error("Error al crear chat:", error);
    res
      .status(500)
      .json({ message: "Error al crear el chat", details: error.message });
  }
};

export const updateChatTitle = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "El título es obligatorio" });
    }
    if (title.trim().length === 0) {
      return res
        .status(400)
        .json({ message: "El título no puede estar vacío" });
    }
    const chat = await Chat.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title },
      { new: true }
    );
    if (!chat) {
      return res.status(404).json({ message: "Chat no encontrado" });
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el título del chat",
      details: error.message,
    });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!chat) {
      return res.status(404).json({ message: "Chat no encontrado" });
    }
    res.status(200).json({ message: "Chat eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el chat", details: error.message });
  }
};

export const sendMessage = async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ message: "El mensaje es obligatorio" });
  }
  if (message.trim().length === 0) {
    return res.status(400).json({ message: "El mensaje no puede estar vacío" });
  }
  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!chat) {
      return res.status(404).json({ message: "Chat no encontrado" });
    }
    chat.messages.push({
      role: "user",
      content: message,
    });

    const hasSystemMessage = chat.messages.some((m) => m.role === "system");
    if (!hasSystemMessage) {
      const user = await User.findById(req.user.id).lean();

      await populateUserData(user);

      const systemPrompt = createChatSystemPrompt(user);

      chat.messages.unshift({
        role: "system",
        content: systemPrompt,
      });
    }

    await chat.save();

    try {
      const aiResponse = await generateAIResponse(chat.messages, req.user.id);
      const assistantMessage = {
        role: "assistant",
        content: aiResponse,
      };

      chat.messages.push(assistantMessage);
      await chat.save();

      res.status(200).json({
        message: assistantMessage.content,
        chat: chat,
      });
    } catch (error) {
      console.error("Error al generar respuesta:", error);
      res.status(500).json({
        message: "Error al generar respuesta del asistente",
        details: error.message,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al enviar el mensaje", details: error.message });
  }
};

async function populateUserData(user) {
  try {
    if (user.classifications && user.classifications.length > 0) {
      const Classification = mongoose.model('Classification');
      const classifications = await Classification.find({
        _id: { $in: user.classifications }
      }).lean();
      user.classifications = classifications;
    }

    if (user.temperament) {
      const Temperament = mongoose.model('Temperament');
      let temperamentIds = Array.isArray(user.temperament) ? user.temperament : [user.temperament];
      const temperaments = await Temperament.find({
        _id: { $in: temperamentIds }
      }).lean();
      user.temperament = temperaments;
    }

    if (user.archetype) {
      const Archetype = mongoose.model('Archetype');
      let archetypeIds = Array.isArray(user.archetype) ? user.archetype : [user.archetype];
      const archetypes = await Archetype.find({
        _id: { $in: archetypeIds }
      }).lean();
      user.archetype = archetypes;
    }

    if (user.emotions && user.emotions.length > 0) {
      const Emotion = mongoose.model('Emotion');
      const emotions = await Emotion.find({
        _id: { $in: user.emotions }
      })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();
      user.emotions = emotions;
    }

    if (user.notes && user.notes.length > 0) {
      const Note = mongoose.model('Note');
      const notes = await Note.find({
        _id: { $in: user.notes }
      })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();
      user.notes = notes;
    }

    if (user.activities && user.activities.length > 0) {
      const Activity = mongoose.model('Activity');
      const activities = await Activity.find({
        _id: { $in: user.activities },
        status: { $ne: 'completed' }
      })
      .limit(7)
      .lean();
      user.activities = activities;
    }

    if (typeof user.temperament === 'string' || (Array.isArray(user.temperament) && user.temperament.length > 0 && typeof user.temperament[0] === 'string')) {
      user.temperamentValue = 'colerico';
    } else if (user.temperament && Array.isArray(user.temperament) && user.temperament.length > 0) {
      user.temperamentValue = user.temperament[0].name?.toLowerCase() || user.temperament[0].type?.toLowerCase();
    }

    if (typeof user.archetype === 'string' || (Array.isArray(user.archetype) && user.archetype.length > 0 && typeof user.archetype[0] === 'string')) {
      user.archetypeValue = 'amante';
    } else if (user.archetype && Array.isArray(user.archetype) && user.archetype.length > 0) {
      user.archetypeValue = user.archetype[0].name?.toLowerCase() || user.archetype[0].type?.toLowerCase();
    }

    if (!user.temperamentValue) user.temperamentValue = 'colerico';
    if (!user.archetypeValue) user.archetypeValue = 'amante';

    console.log("Populated user data with temperament:", user.temperamentValue, "and archetype:", user.archetypeValue);

    return user;
  } catch (error) {
    console.error("Error populating user data:", error);
    user.temperamentValue = 'colerico';
    user.archetypeValue = 'amante';
    return user;
  }
}
