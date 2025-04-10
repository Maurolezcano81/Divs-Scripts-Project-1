import Classification from '../models/classification.model.js';
import { classify } from '../utils/classification.util.js';

const validateClassificationData = (data) => {
  const { archetypeScore, temperamentScore } = data;

  if (!archetypeScore || !temperamentScore) {
    return 'Se requieren tanto archetypeScore como temperamentScore';
  }
  if (typeof archetypeScore !== 'object' || Array.isArray(archetypeScore)) {
    return 'archetypeScore debe ser un objeto';
  }
  if (typeof temperamentScore !== 'object' || Array.isArray(temperamentScore)) {
    return 'temperamentScore debe ser un objeto';
  }
  if (!Object.keys(archetypeScore).length) {
    return 'El objeto archetypeScore no puede estar vacío';
  }
  if (!Object.keys(temperamentScore).length) {
    return 'El objeto temperamentScore no puede estar vacío';
  }

  return null;
};

const saveClassificationResults = async (classificationData, userId = null) => {
  try {
    const classification = new Classification(classificationData);
    if (userId) {
      classification.user = userId;
    }
    await classification.save();
    return classification;
  } catch (error) {
    throw new Error('Error al guardar los resultados de clasificación');
  }
};

export const classifyPersonality = async (req, res) => {
  try {
    const validationError = validateClassificationData(req.body);
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError
      });
    }

    const { archetypeScore, temperamentScore } = req.body;

    const result = classify(archetypeScore, temperamentScore);

    const classificationData = {
      archetypeScore,
      temperamentScore,
      dominantArchetype: result.dominantArchetype,
      dominantTemperament: result.dominantTemperament,
      algorithmVersion: result.metadata.algorithmVersion
    };

    const classification = await saveClassificationResults(
      classificationData,
      req.user?.id
    );

    return res.status(200).json({
      success: true,
      message: "Clasificación completada exitosamente",
      result: {
        preferredArchetype: result.dominantArchetype,
        preferredTemperament: result.dominantTemperament,
        processingDate: result.metadata.processedAt
      },
      id: classification._id
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
        id: c._id,
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


// export const getClassificationById = async (req, res) => {
//   try {
//     const classification = await Classification.findById(req.params.id);

//     if (!classification) {
//       return res.status(404).json({
//         success: false,
//         message: 'Clasificación no encontrada'
//       });
//     }

//     if (req.user?.id && classification.user &&
//         classification.user.toString() !== req.user.id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: 'No está autorizado para acceder a esta clasificación'
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       classification: {
//         id: classification._id,
//         preferredArchetype: classification.dominantArchetype,
//         preferredTemperament: classification.dominantTemperament,
//         archetypeScores: classification.archetypeScore,
//         temperamentScores: classification.temperamentScore,
//         createdAt: classification.createdAt,
//       }
//     });
//   } catch (error) {
//     console.error('Error al obtener la clasificación:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Error al obtener la clasificación',
//       details: error.message
//     });
//   }
// };
