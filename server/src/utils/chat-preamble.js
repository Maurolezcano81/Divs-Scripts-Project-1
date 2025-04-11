import { archetypeBehaviors } from "../common/archetype-behaviors.js";
import { temperamentBehaviors } from "../common/temperament-behaviors.js";

export function createChatSystemPrompt(user) {
  if (!user) {
    return getDefaultSystemPrompt();
  }

  try {
    const classification =
      user.classifications && user.classifications.length > 0
        ? user.classifications[0]
        : null;
    if (!classification) {
      return getDefaultSystemPrompt();
    }
    return generatePreambleFromClassification(classification);
  } catch (error) {
    return getDefaultSystemPrompt();
  }
}

export function generatePreambleFromClassification(classificationData) {
  if (!classificationData) {
    throw new Error("Se requieren datos de clasificación");
  }

  const temperament = classificationData.dominantTemperament;
  const archetype = classificationData.dominantArchetype;

  if (!temperament || !archetype) {
    throw new Error(
      "Los datos de clasificación deben incluir temperamento dominante y arquetipo dominante"
    );
  }

  return generateCombinedPreamble(temperament, archetype);
}

export function generateCombinedPreamble(temperamentProfile, archetypeProfile) {
  if (!temperamentProfile || !archetypeProfile) {
    throw new Error("Se requieren ambos perfiles: temperamento y arquetipo");
  }

  const tempKey = temperamentProfile.toLowerCase();
  const archKey = archetypeProfile.toLowerCase();

  const tempConfig = temperamentBehaviors[tempKey];
  const archConfig = archetypeBehaviors[archKey];

  // sección de temperamento
  const temperamentPreamble = `
Eres un asistente profesional especializado en bienestar mental, diseñado para facilitar la reflexión sobre estados emocionales, patrones de pensamiento y comportamientos.
> No proporcionas diagnósticos clínicos ni sustituyes la atención profesional de salud mental. Tu función se centra en ofrecer apoyo emocional, estrategias de bienestar y orientación general basada en evidencia.

 Perfil del Usuario
 TEMPERAMENTO: ${temperamentProfile}
- Tono: ${tempConfig.tone}
- Estilo: ${tempConfig.style}
- Palabras clave: ${tempConfig.keywords.join(", ")}
- Actitudes: ${tempConfig.attitudes.join(", ")}

 Consideraciones específicas:
${tempConfig.do.map((item) => `• ${item}`).join("\n")}

 Precauciones:
${tempConfig.dont.map((item) => `• ${item}`).join("\n")}
`;

  // sección de arquetipo
  const archetypePreamble = ` ARQUETIPO: ${archetypeProfile}
- Tono arquetípico: ${archConfig.tone}
- Estilo arquetípico: ${archConfig.style}
- Palabras clave: ${archConfig.keywords.join(", ")}
- Actitudes: ${archConfig.attitudes.join(", ")}

 Estrategias recomendadas:
${archConfig.do.map((item) => `• ${item}`).join("\n")}

 Elementos a evitar:
${archConfig.dont.map((item) => `• ${item}`).join("\n")}

Al combinar temperamento y arquetipo, adapta tu comunicación considerando ambos aspectos de la personalidad del usuario:
- Prioriza el temperamento para aspectos emocionales y reacciones
- Utiliza el arquetipo para comprender motivaciones y aspiraciones
- Balanza ambos perfiles para ofrecer una comunicación holística y efectiva`;
  return `${temperamentPreamble}\n\n${archetypePreamble}`;
}

function getDefaultSystemPrompt() {
  return `Eres un asistente profesional especializado en bienestar mental, diseñado para facilitar la reflexión sobre estados emocionales, patrones de pensamiento y comportamientos.
No proporcionas diagnósticos clínicos ni sustituyes la atención profesional de salud mental. Tu función se centra en ofrecer apoyo emocional, estrategias de bienestar y orientación general basada en evidencia.`;
}
