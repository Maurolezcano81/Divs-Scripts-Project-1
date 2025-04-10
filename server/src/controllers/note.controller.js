import Note from '../models/note.model.js';

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id })
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las notas', details: error.message });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la nota', details: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'El título y contenido son obligatorios' });
    }

    if (title.trim().length === 0) {
      return res.status(400).json({ message: 'El título no puede estar vacío' });
    }

    if (content.trim().length === 0) {
      return res.status(400).json({ message: 'El contenido no puede estar vacío' });
    }

    const newNote = await Note.create({
      title,
      content,
      tags: tags || [],
      user: req.user.id
    });

    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la nota', details: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (title !== undefined && title.trim().length === 0) {
      return res.status(400).json({ message: 'El título no puede estar vacío' });
    }
    if (content !== undefined && content.trim().length === 0) {
      return res.status(400).json({ message: 'El contenido no puede estar vacío' });
    }

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, content, tags },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la nota', details: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    res.status(200).json({ message: 'Nota eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la nota', details: error.message });
  }
};
