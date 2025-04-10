import { ArchetypeQuestion } from "@/schemas/Archetypes.schema";

export const archetypeQuestions: ArchetypeQuestion[] = [
    {
        step: 1,
        question: "¿Cuál de estas frases te representa más?",
        options: [
            { option_text: "Confío en que todo saldrá bien.", option_type: ["Inocente"], selected: false },
            { option_text: "Necesito descubrir qué hay más allá.", option_type: ["Explorador"], selected: false }
        ]
    },
    {
        step: 2,
        question: "¿Qué te motiva en la vida?",
        options: [
            { option_text: "Conocer la verdad, aunque duela.", option_type: ["Sabio"], selected: false },
            { option_text: "Superar los desafíos y ganar.", option_type: ["Héroe"], selected: false }
        ]
    },
    {
        step: 3,
        question: "¿Qué valorás más en una sociedad?",
        options: [
            { option_text: "Libertad para romper las reglas.", option_type: ["Forajido"], selected: false },
            { option_text: "Transformar y reinventar el mundo.", option_type: ["Mago"], selected: false }
        ]
    },
    {
        step: 4,
        question: "¿Cuál es tu enfoque en las relaciones?",
        options: [
            { option_text: "Dar amor sin esperar nada a cambio.", option_type: ["Cuidador"], selected: false },
            { option_text: "Conectar profundamente y disfrutar.", option_type: ["Amante"], selected: false }
        ]
    },
    {
        step: 5,
        question: "¿Qué harías en una situación desconocida?",
        options: [
            { option_text: "Buscaría una nueva aventura.", option_type: ["Explorador"], selected: false },
            { option_text: "Intentaría mantenerme seguro/a.", option_type: ["Inocente"], selected: false }
        ]
    },
    {
        step: 6,
        question: "¿Cómo enfrentás los problemas personales?",
        options: [
            { option_text: "Con lógica y conocimiento.", option_type: ["Sabio"], selected: false },
            { option_text: "Con fuerza y determinación.", option_type: ["Héroe"], selected: false }
        ]
    },
    {
        step: 7,
        question: "¿Cómo preferís ayudar a otros?",
        options: [
            { option_text: "Siendo compasivo y acompañando.", option_type: ["Cuidador"], selected: false },
            { option_text: "Inspirando y generando cambio.", option_type: ["Mago"], selected: false }
        ]
    },
    {
        step: 8,
        question: "¿Cómo reaccionás ante las reglas sociales?",
        options: [
            { option_text: "Si no sirven, las rompo.", option_type: ["Forajido"], selected: false },
            { option_text: "Intento mantener la armonía.", option_type: ["Amante"], selected: false }
        ]
    }
];
