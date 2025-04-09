import Archetype from '../models/archetype.model.js';

export const getAllArchetypes = async (req, res) => {
  try {
    const archetypes = await Archetype.find({ user: req.user.id });
    res.status(200).json(archetypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getArchetypeById = async (req, res) => {
  try {
    const archetype = await Archetype.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!archetype) {
      return res.status(404).json({ message: 'Archetype not found' });
    }

    res.status(200).json(archetype);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createArchetype = async (req, res) => {
  try {
    const { cuidador, explorador, forajido, heroe, mago, sabio } = req.body;

    if (!cuidador || !explorador || !forajido || !heroe || !mago || !sabio) {
      return res.status(400).json({ message: 'Cuidador, explorador, forajido, heroe, mago abd sabio are required' });
    }

    const newArchetype = await Archetype.create({
      cuidador,
      explorador,
      forajido,
      heroe,
      mago,
      sabio,
      user: req.user.id
    });

    res.status(201).json(newArchetype);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateArchetype = async (req, res) => {
  try {
    const { cuidador, explorador, forajido, heroe, mago, sabio } = req.body;

    const archetype = await Archetype.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { cuidador, explorador, forajido, heroe, mago, sabio },
      { new: true, runValidators: true }
    );

    if (!archetype) {
      return res.status(404).json({ message: 'Archetype not found' });
    }

    res.status(200).json(archetype);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteArchetype = async (req, res) => {
  try {
    const archetype = await Archetype.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!archetype) {
      return res.status(404).json({ message: 'Archetype not found' });
    }

    res.status(200).json({ message: 'Archetype deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
