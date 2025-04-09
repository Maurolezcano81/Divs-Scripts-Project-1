import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { environment } from "../config/environment.js";
import Chat from "../models/chat.model.js";

export const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user.id })
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los chats', details: error.message });
  }
};

export const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      user:req.user.id,
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat no encontrado" });
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el chat', details: error.message });
  }
};

export const createChat = async (req, res) => {
  try {
    const { title, initialMessage } = req.body;

    const initialMessages = [];

    if (initialMessage) {
      initialMessages.push({
        role: "user",
        content: initialMessage,
      });
    }

    // Opcional: Generar respuesta inicial del asistente
    // Descomentar si deseas una respuesta automática del asistente al crear un chat
    /*
    try {
      const { text } = await generateText({
        model: llm( "gpt-4o"),
        messages: initialMessages,
      });

      initialMessages.push({
        role: "assistant",
        content: text,
      });
    } catch (error) {
      console.error("Error al generar respuesta inicial:", error);
    }
    */

    const newChat = await Chat.create({
      title: title || "Nueva Conversación",
      messages: initialMessages,
      user:req.user.id,
    });

    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el chat', details: error.message });
  }
};

export const updateChatTitle = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "El título es obligatorio" });
    }

    if (title.trim().length === 0) {
      return res.status(400).json({ message: "El título no puede estar vacío" });
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
    res.status(500).json({ message: 'Error al actualizar el título del chat', details: error.message });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({
      _id: req.params.id,
      user:req.user.id,
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat no encontrado" });
    }

    res.status(200).json({ message: "Chat eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el chat', details: error.message });
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
      user:req.user.id,
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat no encontrado" });
    }

    chat.messages.push({
      role: "user",
      content: message,
    });

    await chat.save();

    const llm = new createOpenAI({
      apiKey: environment.openai.apiKey,
      baseURL: environment.openai.apiUrl,
    });

    try {
      const { text } = await generateText({
        model: llm("gpt-4o"),
        messages: chat.messages,
      });

      const assistantMessage = {
        role: "assistant",
        content: text,
      };

      chat.messages.push(assistantMessage);
      await chat.save();
      res.status(200).json({
        message: assistantMessage.content,
        chat: chat,
      });
    } catch (error) {
      console.error("Error al generar respuesta:", error);
      res.status(500).json({ message: "Error al generar respuesta del asistente", details: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar el mensaje', details: error.message });
  }
};