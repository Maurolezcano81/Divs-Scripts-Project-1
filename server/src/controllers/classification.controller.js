import Archetype from '../models/archetype.model.js';
import Temperament from '../models/temperament.model.js';
import Classification from '../models/classification.model.js';
import { classify } from '../utils/classification.util.js';



export const classifyPersonality = async (req, res) => {
  try {
    const userId = req.user?.id;
    const  archetypeScore = await Archetype.findOne({ user: userId }),
      temperamentScore = await Temperament.findOne({ user: userId });

    if (!archetypeScore || !temperamentScore) {
      return res.status(404).json({
        message: 'No se encontraron los puntajes de arquetipos o temperamentos'
      });
    }

    const result = classify(archetypeScore, temperamentScore);

    const classificationData = {
      archetypeScore,
      temperamentScore,
      dominantArchetype: result.dominantArchetype,
      dominantTemperament: result.dominantTemperament,
      algorithmVersion: result.metadata.algorithmVersion
    };

    const classification = new Classification(classificationData);
    if (userId) {
      classification.user = userId;
    }
    await classification.save();

    return res.status(200).json({
      success: true,
      message: "Clasificación completada exitosamente",
      result: {
        preferredArchetype: result.dominantArchetype,
        preferredTemperament: result.dominantTemperament,
        processingDate: result.metadata.processedAt
      },
      id: classification.id
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error interno al procesar la clasificación',
      details: error.message
    });
  }
};

export const getClassifications = async (req, res) => {
  try {
    const query = req.user?.id ? { user: req.user.id } : {};
    const classifications = await Classification.find(query).sort('-createdAt');

    return res.status(200).json({
      success: true,
      classifications: classifications.map(c => ({
        id: c.id,
        preferredArchetype: c.dominantArchetype,
        preferredTemperament: c.dominantTemperament,
        createdAt: c.createdAt
      }))
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener las clasificaciones',
      details: error.message
    });
  }
};

