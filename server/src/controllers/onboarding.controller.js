import { createArchetypeCore } from "./archetype.controller.js";
import { createTemperamentCore } from "./temperament.controller.js";
import { activateUser } from "./user.controller.js";
import { classify } from "../utils/classification.util.js";
import Classification from "../models/classification.model.js";

export const createOnboarding = async (req, res) => {
  try {
    const { archetypeScore, temperamentScore } = req.body;

    if (!archetypeScore || !temperamentScore) {
      return res.status(400).json({ message: 'El puntaje de temperamento y de arquetipo son obligatorios' });
    }

    // const expectedArchetypeFields = ['Amante', 'Cuidador', 'Explorador', 'Forajido', 'Héroe', 'Mago', 'Sabio'];
    // const expectedTemperamentFields = ['Colerico', 'Flematico', 'Melancolico', 'Sanguineo', 'Supino'];

    // const missingArchetypeFields = expectedArchetypeFields.filter(field => archetypeScore[field] === undefined);
    // const missingTemperamentFields = expectedTemperamentFields.filter(field => temperamentScore[field] === undefined);

    // if (missingArchetypeFields.length > 0 || missingTemperamentFields.length > 0) {
    //   return res.status(400).json({
    //     message: 'Formato de datos incorrecto',
    //     details: {
    //       missingArchetypeFields,
    //       missingTemperamentFields
    //     }
    //   });
    // }

    const newArchetype = await createArchetypeCore(archetypeScore, req.user.id);
    const newTemperament = await createTemperamentCore(temperamentScore, req.user.id);

    const result = classify(archetypeScore, temperamentScore);

    const classificationData = {
      archetypeScore,
      temperamentScore,
      dominantArchetype: result.dominantArchetype,
      dominantTemperament: result.dominantTemperament,
      user: req.user.id
    };

    const classification = await Classification.create(classificationData);

    const userActivated = await activateUser(req.user.id);

    res.status(201).json({
      newTemperament,
      newArchetype,
      classification: {
        preferredArchetype: result.dominantArchetype,
        preferredTemperament: result.dominantTemperament,
        processingDate: result.metadata.processedAt,
        id: classification.id
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el temperamento y el arquetipo', details: error.message });
  }
};