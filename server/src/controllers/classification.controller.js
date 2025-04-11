import Classification from '../models/classification.model.js';
import User from '../models/user.model.js';
import { classify } from '../utils/classification.util.js';

export const classifyPersonality = async (req, res) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId)
      .populate('archetype')
      .populate('temperament');

    if (!user) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    if (!user.archetype || !user.archetype[0] || !user.temperament || !user.temperament[0]) {
      return res.status(404).json({
        message: 'No se encontraron los datos de arquetipos o temperamentos'
      });
    }

    const archetypeData = user.archetype[0];
    const temperamentData = user.temperament[0];

    const archetypeScore = {
      Amante: archetypeData.Amante,
      Cuidador: archetypeData.Cuidador,
      Explorador: archetypeData.Explorador,
      Forajido: archetypeData.Forajido,
      Héroe: archetypeData.Héroe,
      Mago: archetypeData.Mago,
      Sabio: archetypeData.Sabio
    };

    const temperamentScore = {
      Colerico: temperamentData.Colerico,
      Flematico: temperamentData.Flematico,
      Melancolico: temperamentData.Melancolico,
      Sanguineo: temperamentData.Sanguineo,
      Supino: temperamentData.Supino
    };

    const result = classify(archetypeScore, temperamentScore);

    if (!result.dominantArchetype || !result.dominantTemperament) {
      console.error('Classification failed to return valid dominant types:', result);

      const dominantArchetype = Object.entries(archetypeScore)
        .sort((a, b) => b[1] - a[1])[0][0];

      const dominantTemperament = Object.entries(temperamentScore)
        .sort((a, b) => b[1] - a[1])[0][0];

      result.dominantArchetype = result.dominantArchetype || dominantArchetype;
      result.dominantTemperament = result.dominantTemperament || dominantTemperament;
    }

    const classificationData = {
      archetypeScore,
      temperamentScore,
      dominantArchetype: result.dominantArchetype,
      dominantTemperament: result.dominantTemperament,
      user: userId
    };

    if (!classificationData.dominantArchetype || !classificationData.dominantTemperament) {
      return res.status(400).json({
        success: false,
        message: 'No se pudo determinar el arquetipo o temperamento dominante',
        details: 'Los valores dominantes son requeridos para la clasificación'
      });
    }

    const classification = await Classification.create(classificationData);

    if (!user.active) {
      await User.findByIdAndUpdate(userId, { active: true });
    }

    return res.status(200).json({
      success: true,
      message: "Clasificación completada exitosamente",
      result: {
        preferredArchetype: result.dominantArchetype,
        preferredTemperament: result.dominantTemperament,
        processingDate: result.metadata.processedAt,
        userData: {
          name: user.name,
          email: user.email,
          active: user.active,
          archetype: user.archetype,
          temperament: user.temperament
        }
      },
      id: classification.id
    });

  } catch (error) {
    console.error('Classification error:', error);
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

    const classifications = await Classification.find(query)
      .sort('-createdAt')
      .populate({
        path: 'user',
        populate: [
          { path: 'archetype' },
          { path: 'temperament' },
          { path: 'emotions' },
          { path: 'notes' },
          { path: 'activities' }
        ]
      });
    return res.status(200).json({
      success: true,
      classifications: classifications.map(c => ({
        id: c.id,
        preferredArchetype: c.dominantArchetype,
        preferredTemperament: c.dominantTemperament,
        createdAt: c.createdAt,
        user: {
          id: c.user._id,
          name: c.user.name,
          email: c.user.email,
          active: c.user.active,
          archetype: c.user.archetype,
          temperament: c.user.temperament,
          emotions: c.user.emotions,
          notes: c.user.notes,
          activities: c.user.activities
        }
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