import { archetypeBehaviors } from "../common/archetype-behaviors.js";
import { temperamentBehaviors } from "../common/temperament-behaviors.js";

export function createChatSystemPrompt(user) {
  if (!user) {
    return getDefaultSystemPrompt();
  }
  try {
    return generateUserPreamble(user);
  } catch (error) {
    return getDefaultSystemPrompt();
  }
}

function generateUserPreamble(user) {
  let temperament, archetype;

  // First try to use our explicitly populated values
  if (user.temperamentValue && user.archetypeValue) {
    temperament = user.temperamentValue;
    archetype = user.archetypeValue;
    console.log("Using explicit temperament and archetype values:", temperament, archetype);
  }
  // Then try the normal extraction logic if explicit values not found
  else if (user.classifications && user.classifications.length > 0) {
    const classification = user.classifications[0];
    temperament = classification.dominantTemperament;
    archetype = classification.dominantArchetype;
  } else {
    if (user.temperament) {
      if (Array.isArray(user.temperament)) {
        if (user.temperament.length > 0) {
          const temp = user.temperament[0];
          temperament = typeof temp === "string" ? temp : (temp.name || temp.type);
        }
      } else if (typeof user.temperament === "object") {
        temperament = user.temperament.name || user.temperament.type;
      } else if (typeof user.temperament === "string") {
        temperament = user.temperament;
      }
    }

    if (user.archetype) {
      if (Array.isArray(user.archetype)) {
        if (user.archetype.length > 0) {
          const arch = user.archetype[0];
          archetype = typeof arch === "string" ? arch : (arch.name || arch.type);
        }
      } else if (typeof user.archetype === "object") {
        archetype = user.archetype.name || user.archetype.type;
      } else if (typeof user.archetype === "string") {
        archetype = user.archetype;
      }
    }
  }

  let preamble = "";
  if (temperament && archetype) {
    try {
      const tempKey = temperament.toLowerCase();
      const archKey = archetype.toLowerCase();

      console.log("Looking up temperament config for:", tempKey);
      console.log("Looking up archetype config for:", archKey);
      console.log("Available temperaments:", Object.keys(temperamentBehaviors));
      console.log("Available archetypes:", Object.keys(archetypeBehaviors));

      if (!Object.keys(temperamentBehaviors).includes(tempKey)) {
        console.warn(`Temperament key "${tempKey}" not found in config. Using default.`);
        const availableTemps = Object.keys(temperamentBehaviors);
        if (availableTemps.length > 0) {
          temperament = availableTemps[0];
        }
      }

      if (!Object.keys(archetypeBehaviors).includes(archKey)) {
        console.warn(`Archetype key "${archKey}" not found in config. Using default.`);
        const availableArchs = Object.keys(archetypeBehaviors);
        if (availableArchs.length > 0) {
          archetype = availableArchs[0];
        }
      }

      const tempConfig = temperamentBehaviors[temperament.toLowerCase()];
      const archConfig = archetypeBehaviors[archetype.toLowerCase()];

      if (!tempConfig || !archConfig) {
        throw new Error(
          `Configuración no encontrada para ${temperament}/${archetype}`
        );
      }

      preamble = `
🎯 MISIÓN DEL ASISTENTE:
Eres una IA especializada en acompañamiento psicológico conversacional. No diagnosticas ni reemplazas atención clínica. Tu propósito es **facilitar el autoconocimiento emocional, la reflexión introspectiva y el fortalecimiento del bienestar psicológico del usuario**, con foco en la **adaptación a su perfil individual**.

🧭 MARCO OPERATIVO:
Actúas como guía adaptable, orientada a:
- Escuchar activamente.
- Reflejar y validar emociones sin juicio.
- Ofrecer ideas, recursos y estrategias orientadas a mejorar la autoobservación, el manejo emocional y la toma de decisiones personales.
- Actuar como espejo cognitivo y emocional, no como juez ni experto externo.

🧬 PERFIL PSICOPSICOLÓGICO DEL USUARIO:

DATOS PERSONALES:
${user.name ? `- Nombre: ${user.name}` : ""}
${
  user.gender && user.gender !== "prefer not to say"
    ? `\n- Género: ${user.gender}`
    : ""
}
${user.birthDate ? `\n- Edad: ${calculateAge(user.birthDate)} años` : ""}
${user.nationality ? `\n- Nacionalidad: ${user.nationality}` : ""}

TEMPERAMENTO DOMINANTE: ${temperament}
- 🗣️ Tono emocional ideal: ${tempConfig.tone}
- 🎨 Estilo comunicacional: ${tempConfig.style}
- 🧩 Palabras clave asociadas: ${tempConfig.keywords.join(", ")}
- 🎭 Actitudes que debes asumir: ${tempConfig.attitudes.join(", ")}

✔️ Intervenciones recomendadas:
${tempConfig.do.map((item) => `• ${item}`).join("\n")}

⛔ Riesgos comunicacionales a evitar:
${tempConfig.dont.map((item) => `• ${item}`).join("\n")}

ARQUETIPO MOTIVACIONAL: ${archetype}
- 🔮 Tono narrativo/motivacional: ${archConfig.tone}
- 🖋️ Estilo simbólico/identitario: ${archConfig.style}
- 🌟 Palabras clave inspiradoras: ${archConfig.keywords.join(", ")}
- 👤 Actitudes representadas: ${archConfig.attitudes.join(", ")}

💡 Estrategias activadoras:
${archConfig.do.map((item) => `• ${item}`).join("\n")}

🚫 Elementos que desestabilizan este arquetipo:
${archConfig.dont.map((item) => `• ${item}`).join("\n")}

🧠 SÍNTESIS ADAPTATIVA:
- Usa el **temperamento** como guía para la contención emocional y la empatía reactiva.
- Usa el **arquetipo** como canal para movilizar recursos internos, narrativas de sentido y motivaciones.
- Cuando haya disonancia entre ambos, prioriza la **regulación emocional antes que la activación motivacional**.
- Evitá contradicciones entre lo emocional y lo aspiracional.`;

      if (user.emotions && Array.isArray(user.emotions) && user.emotions.length > 0) {
        preamble += `

📈 HISTORIA RECIENTE:
🧠 REGISTRO EMOCIONAL:
${user.emotions
  .slice(0, 10)
  .map(
    (emotion) =>
      `- ${emotion.mood || 'Sin estado'} (Intensidad: ${emotion.intensity || 'N/A'}/10) - ${formatDate(
        emotion.createdAt || new Date()
      )}\n${emotion.notes ? `  Notas: ${emotion.notes}` : ""}`
  )
  .join("\n")}`;
      }

      if (user.notes && Array.isArray(user.notes) && user.notes.length > 0) {
        preamble += `

📝 NOTAS TOMADAS POR EL USUARIO:
${user.notes
  .slice(0, 10)
  .map(
    (note) =>
      `- ${note.title || 'Sin título'}: ${summarizeText(note.content || '', 90)}${
        note.tags?.length ? `\n  Tags: ${note.tags.join(", ")}` : ""
      }`
  )
  .join("\n")}`;
      }

      if (user.activities && Array.isArray(user.activities) && user.activities.length > 0) {
        const pendingActivities = user.activities.filter(
          (act) => act.status !== "completed"
        );

        if (pendingActivities.length > 0) {
          preamble += `

📌 ACTIVIDADES ABIERTAS:
${pendingActivities
  .map(
    (activity) =>
      `- ${activity.title || 'Sin título'} (${activity.status || 'pendiente'}): ${summarizeText(
        activity.description || '',
        50
      )}`
  )
  .join("\n")}`;
        }
      }

      preamble += `

📏 REGLAS DE INTERACCIÓN (DO/DON'T):
✔️ Hacer siempre:
• Escuchar activamente, reflejar sin juicio.
• Usar metáforas cuando el arquetipo lo requiera.
• Realizar preguntas abiertas, progresivas.
• Adaptar el ritmo conversacional al estado emocional percibido.
• Validar emociones antes de sugerir alternativas.

❌ Evitar:
• Afirmaciones tajantes o directivas.
• Minimizar experiencias difíciles.
• Usar clichés o frases motivacionales vacías.
• Invasividad emocional o interpretación excesiva.
• Prometer resultados o certeza emocional.

🔄 ESCENARIOS DINÁMICOS:
Debes adaptarte al contexto de la sesión. Algunas posibilidades incluyen:
- Exploración emocional espontánea.
- Duda o ambivalencia en decisiones.
- Detección de patrones internos (cognitivos/emocionales).
- Búsqueda de sentido, propósito o dirección.
- Petición de estrategias concretas de afrontamiento.

🔐 CONDICIÓN FINAL:
Actúa con prudencia, contención y creatividad. Tu función no es resolver al usuario, sino **acompañarlo inteligentemente** mientras se transforma a sí mismo.`;

    } catch (error) {
      console.error("Error al generar preámbulo psicológico:", error);
      preamble = getDefaultSystemPrompt();
    }
  } else {
    preamble = getDefaultSystemPrompt();
  }

  let userProfile = "\n\nINFORMACIÓN DE IDENTIFICACIÓN DEL USUARIO:\n";
  if (user.name) userProfile += `- Nombre: ${user.name}\n`;
  if (user.gender && user.gender !== "prefer not to say")
    userProfile += `- Género: ${user.gender}\n`;
  if (user.birthDate) {
    const age = calculateAge(user.birthDate);
    userProfile += `- Edad: ${age} años\n`;
  }
  if (user.nationality) userProfile += `- Nacionalidad: ${user.nationality}\n`;
  if (temperament) userProfile += `- Temperamento: ${temperament}\n`;
  if (archetype) userProfile += `- Arquetipo: ${archetype}\n`;

  return preamble + userProfile;
}

function getDefaultSystemPrompt() {
  return `Eres un asistente profesional especializado en bienestar mental, diseñado para facilitar la reflexión sobre estados emocionales, patrones de pensamiento y comportamientos.
No proporcionas diagnósticos clínicos ni sustituyes la atención profesional de salud mental. Tu función se centra en ofrecer apoyo emocional, estrategias de bienestar y orientación general basada en evidencia.`;
}

function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function summarizeText(text, maxLength) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}
