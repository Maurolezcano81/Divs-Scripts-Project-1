import Activity from '../models/activity.model.js';

export const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user.id });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las actividades', details: error.message });
  }
};

export const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!activity) {
      return res.status(404).json({ message: 'Actividad no encontrada' });
    }

    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la actividad', details: error.message });
  }
};

export const createActivity = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'El título y descripción son obligatorios' });
    }

    if (title.trim().length === 0) {
      return res.status(400).json({ message: 'El título no puede estar vacío' });
    }

    if (description.trim().length === 0) {
      return res.status(400).json({ message: 'La descripción no puede estar vacía' });
    }

    if (status && !['pendiente', 'en-progreso', 'completado', 'cancelado'].includes(status)) {
      return res.status(400).json({
        message: 'Estado no válido. Debe ser: pendiente, en-progreso, completado o cancelado'
      });
    }

    const newActivity = await Activity.create({
      title,
      description,
      status: status || 'pendiente',
      dueDate,
      user: req.user.id
    });

    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la actividad', details: error.message });
  }
};

export const updateActivity = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    if (title !== undefined && title.trim().length === 0) {
      return res.status(400).json({ message: 'El título no puede estar vacío' });
    }

    if (description !== undefined && description.trim().length === 0) {
      return res.status(400).json({ message: 'La descripción no puede estar vacía' });
    }

    if (status && !['pendiente', 'en-progreso', 'completado', 'cancelado'].includes(status)) {
      return res.status(400).json({
        message: 'Estado no válido. Debe ser: pendiente, en-progreso, completado o cancelado'
      });
    }

    const activity = await Activity.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, description, status, dueDate },
      { new: true, runValidators: true }
    );

    if (!activity) {
      return res.status(404).json({ message: 'Actividad no encontrada' });
    }

    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la actividad', details: error.message });
  }
};

export const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!activity) {
      return res.status(404).json({ message: 'Actividad no encontrada' });
    }

    res.status(200).json({ message: 'Actividad eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la actividad', details: error.message });
  }
};
