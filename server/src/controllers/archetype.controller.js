import Archetype from '../models/archetype.model.js';

export const getAllArchetypes = async (req, res) => {
  try {
    const archetypes = await Archetype.find({ user: req.user.id });
    res.status(200).json(archetypes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los arquetipos', details: error.message });
  }
};

export const getArchetypeById = async (req, res) => {
  try {
    const archetype = await Archetype.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!archetype) {
      return res.status(404).json({ message: 'Arquetipo no encontrado' });
    }

    res.status(200).json(archetype);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el arquetipo', details: error.message });
  }
};

export const createArchetype = async (req, res) => {
  try {

    const newArchetype = await createArchetypeCore(req.body, req.user.id)
    res.status(201).json(newArchetype);

  } catch (error) {

    res.status(500).json({ message: 'Error al crear el arquetipo', details: error.message });

  }
};


export const createArchetypeCore = async (data, userId) => {
  const { Cuidador, Explorador, Forajido, Héroe, Mago, Sabio } = data;

  const newArchetype = await Archetype.create({
    Cuidador,
    Explorador,
    Forajido,
    Héroe,
    Mago,
    Sabio,
    user: userId
  });

  return newArchetype;
}


export const updateArchetype = async (req, res) => {
  try {
    const { cuidador, explorador, forajido, heroe, mago, sabio } = req.body;

    if ((cuidador !== undefined && isNaN(cuidador)) ||
      (explorador !== undefined && isNaN(explorador)) ||
      (forajido !== undefined && isNaN(forajido)) ||
      (heroe !== undefined && isNaN(heroe)) ||
      (mago !== undefined && isNaN(mago)) ||
      (sabio !== undefined && isNaN(sabio))) {
      return res.status(400).json({ message: 'Todos los valores de arquetipo deben ser numéricos' });
    }

    const archetype = await Archetype.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { cuidador, explorador, forajido, heroe, mago, sabio },
      { new: true, runValidators: true }
    );

    if (!archetype) {
      return res.status(404).json({ message: 'Arquetipo no encontrado' });
    }

    res.status(200).json(archetype);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el arquetipo', details: error.message });
  }
};

export const deleteArchetype = async (req, res) => {
  try {
    const archetype = await Archetype.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!archetype) {
      return res.status(404).json({ message: 'Arquetipo no encontrado' });
    }

    res.status(200).json({ message: 'Arquetipo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el arquetipo', details: error.message });
  }
};
