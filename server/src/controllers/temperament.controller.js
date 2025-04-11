import Temperament from '../models/temperament.model.js';

export const getAllTemperaments = async (req, res) => {
  try {
    const temperaments = await Temperament.find({ user: req.user.id });
    res.status(200).json(temperaments);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los temperamentos', details: error.message });
  }
};

export const getTemperamentById = async (req, res) => {
  try {
    const temperament = await Temperament.findOne({
      id: req.params.id,
      user: req.user.id
    });

    if (!temperament) {
      return res.status(404).json({ message: 'Temperamento no encontrado' });
    }

    res.status(200).json(temperament);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el temperamento', details: error.message });
  }
};

export const createTemperament = async (req, res) => {
  try {
    const newTemperament = await createTemperamentCore(req.body, req.user.id);

    res.status(201).json(newTemperament);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el temperamento', details: error.message });
  }
};

export const createTemperamentCore = async (data, userId) => {
  const { Colerico, Flematico, Melancolico, Sanguineo, Supino } = data;

  const newTemperament = await Temperament.create({
    Colerico,
    Flematico,
    Melancolico,
    Sanguineo,
    Supino,
    user: userId
  });

  return newTemperament;

}


export const updateTemperament = async (req, res) => {
  try {
    const { colerico, flematico, melancolico, sanguineo, supino } = req.body;

    if (colerico !== undefined && isNaN(colerico) ||
      flematico !== undefined && isNaN(flematico) ||
      melancolico !== undefined && isNaN(melancolico) ||
      sanguineo !== undefined && isNaN(sanguineo) ||
      supino !== undefined && isNaN(supino)) {
      return res.status(400).json({ message: 'Todos los valores de temperamento deben ser numéricos' });
    }

    const temperament = await Temperament.findOneAndUpdate(
      { id: req.params.id, user: req.user.id },
      { colerico, flematico, melancolico, sanguineo, supino },
      { new: true, runValidators: true }
    );

    if (!temperament) {
      return res.status(404).json({ message: 'Temperamento no encontrado' });
    }

    res.status(200).json(temperament);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el temperamento', details: error.message });
  }
};

export const deleteTemperament = async (req, res) => {
  try {
    const temperament = await Temperament.findOneAndDelete({
      id: req.params.id,
      user: req.user.id
    });

    if (!temperament) {
      return res.status(404).json({ message: 'Temperamento no encontrado' });
    }

    res.status(200).json({ message: 'Temperamento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el temperamento', details: error.message });
  }
};
