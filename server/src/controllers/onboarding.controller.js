import { createArchetypeCore } from "./archetype.controller.js";
import { createTemperamentCore } from "./temperament.controller.js";
import { activateUser } from "./user.controller.js";

export const createOnboarding = async (req, res) => {

  try {
    const { archetypeScore, temperamentScore } = req.body;

    if (!archetypeScore || !temperamentScore) {
      return res.status(400).json({ message: 'El puntaje de temperamento y de arquetipo son obligatorios' });
    }

    const newArchetype = await createArchetypeCore(archetypeScore, req.user.id)
    const newTemperament = await createTemperamentCore(temperamentScore, req.user.id)
    const userActivated = await activateUser(req.user.id)

    res.status(201).json({ newTemperament, newArchetype });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el temperamento y el arquetipo', details: error.message });
  }
};
