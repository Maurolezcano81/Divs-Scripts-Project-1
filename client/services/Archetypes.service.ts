import { ArchetypeQuestion } from "@/schemas/Archetypes.schema";

export const archetypeQuestions: ArchetypeQuestion[] = [
    {
      step: 1,
      question: "¿Cuál de estas frases te representa más?",
      options: [
        { option_text: "Confío en que todo saldrá bien.", option_type: ["Inocente"], selected: false },
        { option_text: "Necesito descubrir qué hay más allá.", option_type: ["Explorador"], selected: false },
        { option_text: "Estoy para cuidar y proteger a los demás.", option_type: ["Cuidador"], selected: false },
        { option_text: "Romper las reglas es el primer paso hacia la libertad.", option_type: ["Forajido"], selected: false },
        { option_text: "Enfrento todo con valentía para lograr mis metas.", option_type: ["Héroe"], selected: false },
        { option_text: "Creo que todo puede transformarse con intención y visión.", option_type: ["Mago"], selected: false },
        { option_text: "Me guía la razón y la búsqueda del conocimiento.", option_type: ["Sabio"], selected: false }
      ]
    },
    {
      step: 2,
      question: "¿Qué te motiva en la vida?",
      options: [
        { option_text: "Conocer la verdad, aunque duela.", option_type: ["Sabio"], selected: false },
        { option_text: "Superar los desafíos y ganar.", option_type: ["Héroe"], selected: false },
        { option_text: "Descubrir lo desconocido, incluso si implica riesgos.", option_type: ["Explorador", "Forajido"], selected: false },
        { option_text: "Ayudar a otros a sentirse seguros y acompañados.", option_type: ["Cuidador"], selected: false },
        { option_text: "Transformar el mundo con ideas nuevas.", option_type: ["Mago"], selected: false }
      ]
    },
    {
      step: 3,
      question: "¿Qué valorás más en una sociedad?",
      options: [
        { option_text: "La posibilidad de cuidarnos entre todos.", option_type: ["Cuidador"], selected: false },
        { option_text: "La libertad para explorar caminos alternativos.", option_type: ["Explorador"], selected: false },
        { option_text: "Que cada uno pueda romper normas que no sirven.", option_type: ["Forajido"], selected: false },
        { option_text: "Una sociedad justa, donde se premie el esfuerzo.", option_type: ["Héroe"], selected: false },
        { option_text: "La capacidad de reinventarse y evolucionar.", option_type: ["Mago"], selected: false },
        { option_text: "El acceso a la educación y el pensamiento crítico.", option_type: ["Sabio"], selected: false }
      ]
    },
    {
      step: 4,
      question: "¿Cuál es tu enfoque en las relaciones?",
      options: [
        { option_text: "Dar amor sin esperar nada a cambio.", option_type: ["Cuidador"], selected: false },
        { option_text: "Conectar profundamente y disfrutar.", option_type: ["Amante"], selected: false },
        { option_text: "Ser libre de vivir relaciones a mi manera.", option_type: ["Forajido", "Explorador"], selected: false },
        { option_text: "Ser un apoyo fuerte en los momentos difíciles.", option_type: ["Héroe"], selected: false },
        { option_text: "Sanar heridas profundas y generar magia juntos.", option_type: ["Mago"], selected: false },
        { option_text: "Entender al otro desde la reflexión y la empatía racional.", option_type: ["Sabio"], selected: false }
      ]
    },
    {
      step: 5,
      question: "¿Qué harías en una situación desconocida?",
      options: [
        { option_text: "Buscaría una nueva aventura.", option_type: ["Explorador"], selected: false },
        { option_text: "Intentaría mantenerme seguro/a.", option_type: ["Inocente"], selected: false },
        { option_text: "Actuaría con calma para ayudar a otros.", option_type: ["Cuidador"], selected: false },
        { option_text: "Rompería cualquier regla que me limite.", option_type: ["Forajido"], selected: false },
        { option_text: "Lucharía para superar el obstáculo.", option_type: ["Héroe"], selected: false },
        { option_text: "Buscaría transformar la situación con creatividad.", option_type: ["Mago"], selected: false },
        { option_text: "Analizaría todo antes de actuar.", option_type: ["Sabio"], selected: false }
      ]
    },
    {
      step: 6,
      question: "¿Cómo enfrentás los problemas personales?",
      options: [
        { option_text: "Con lógica y conocimiento.", option_type: ["Sabio"], selected: false },
        { option_text: "Con fuerza y determinación.", option_type: ["Héroe"], selected: false },
        { option_text: "Acompañando y conteniendo a quienes me rodean.", option_type: ["Cuidador"], selected: false },
        { option_text: "Rompiendo con todo y buscando un nuevo camino.", option_type: ["Forajido"], selected: false },
        { option_text: "Con fe en mi intuición y en el cambio.", option_type: ["Mago"], selected: false },
        { option_text: "Explorando distintas opciones para entender mejor la situación.", option_type: ["Explorador"], selected: false }
      ]
    },
    {
      step: 7,
      question: "¿Cómo preferís ayudar a otros?",
      options: [
        { option_text: "Siendo compasivo y acompañando.", option_type: ["Cuidador"], selected: false },
        { option_text: "Inspirando y generando cambio.", option_type: ["Mago"], selected: false },
        { option_text: "Rompiendo estructuras que ya no sirven.", option_type: ["Forajido"], selected: false },
        { option_text: "Dando el ejemplo con acciones valientes.", option_type: ["Héroe"], selected: false },
        { option_text: "Brindando herramientas para que encuentren su propio camino.", option_type: ["Explorador"], selected: false },
        { option_text: "Compartiendo conocimiento y sabiduría.", option_type: ["Sabio"], selected: false }
      ]
    },
    {
      step: 8,
      question: "¿Cómo reaccionás ante las reglas sociales?",
      options: [
        { option_text: "Si no sirven, las rompo.", option_type: ["Forajido"], selected: false },
        { option_text: "Intento mantener la armonía.", option_type: ["Amante"], selected: false },
        { option_text: "Las analizo con lógica antes de seguirlas o no.", option_type: ["Sabio"], selected: false },
        { option_text: "Trato de transformarlas desde adentro.", option_type: ["Mago"], selected: false },
        { option_text: "Me adapto si eso ayuda a cuidar a los demás.", option_type: ["Cuidador"], selected: false },
        { option_text: "Prefiero seguir mi propio camino, sin imponerme límites.", option_type: ["Explorador"], selected: false },
        { option_text: "Lucho contra lo injusto, aunque esté establecido.", option_type: ["Héroe"], selected: false }
      ]
    }
  ];
  