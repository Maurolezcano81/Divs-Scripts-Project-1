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
      id: req.params.id,
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
    const { title, initialMessage } = req.body;

    const userId = req.user.id;
    const user = await User.findById(userId)
      .populate("classifications")
      .select("classifications name");

    const initialMessages = [];

    const systemPrompt = createChatSystemPrompt(user);
    initialMessages.push({
      role: "system",
      content: systemPrompt,
    });

    const newChat = await Chat.create({
      title: title || "Nueva Conversación",
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
      { id: req.params.id, user: req.user.id },
      { title },
      { new: true }
    );

    if (!chat) {
      return res.status(404).json({ message: "Chat no encontrado" });
    }

    res.status(200).json(chat);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al actualizar el título del chat",
        details: error.message,
      });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({
      id: req.params.id,
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
      id: req.params.id,
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
      const user = await User.findById(req.user.id)
        .populate("classifications")
        .select("classifications name");

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
      res
        .status(500)
        .json({
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
