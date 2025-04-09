import { TemperamentWizardType } from "@/schemas/Temper.schema";

export const temperamentQuestions: TemperamentWizardType = [
    {
        step: 1,
        question: "¿Cómo reaccionás cuando se te presenta una oportunidad repentina?",
        options: [
            {
                option_text: "La tomo sin pensarlo, me entusiasma lo nuevo",
                option_type: ["Sanguineo"],
                selected: false
            },
            {
                option_text: "Analizo si realmente vale la pena antes de actuar",
                option_type: ["Melancolico"],
                selected: false
            },
            {
                option_text: "Tiendo a mantenerme en mi rutina, no cambio fácilmente",
                option_type: ["Flematico"],
                selected: false
            },
            {
                option_text: "Actúo rápido y me esfuerzo por liderar en la situación",
                option_type: ["Colerico"],
                selected: false
            }
        ]
    },
    {
        step: 2,
        question: "¿Qué hacés cuando alguien no cumple con lo prometido?",
        options: [
            {
                option_text: "Lo confronto directamente, no tolero irresponsabilidades",
                option_type: ["Colerico", "Supino"],
                selected: false
            },
            {
                option_text: "Me frustra mucho, pero prefiero guardármelo",
                option_type: ["Melancolico", "Supino"],
                selected: false
            },
            {
                option_text: "Lo dejo pasar, no me gusta el conflicto",
                option_type: ["Flematico"],
                selected: false
            },
            {
                option_text: "Trato de entender qué le pasó, soy flexible con los demás",
                option_type: ["Sanguineo", "Flematico"],
                selected: false
            }
        ]
    },
    {
        step: 3,
        question: "¿Cómo es tu estilo de comunicación en grupo?",
        options: [
            {
                option_text: "Suelto y divertido, me encanta ser el centro de atención",
                option_type: ["Sanguineo"],
                selected: false
            },
            {
                option_text: "Serio y directo, me gusta ir al punto",
                option_type: ["Colerico"],
                selected: false
            },
            {
                option_text: "Reservado y preciso, cuido mucho mis palabras",
                option_type: ["Melancolico"],
                selected: false
            },
            {
                option_text: "Tranquilo y cooperativo, sin buscar protagonismo",
                option_type: ["Flematico"],
                selected: false
            }
        ]
    },
    {
        step: 4,
        question: "¿Cómo manejás tus emociones ante un problema personal?",
        options: [
            {
                option_text: "Me frustro en silencio, pero no lo demuestro",
                option_type: ["Supino", "Melancolico"],
                selected: false
            },
            {
                option_text: "Exploto fácilmente y luego me calmo",
                option_type: ["Colerico", "Sanguineo"],
                selected: false
            },
            {
                option_text: "Busco distraerme con otras cosas, no me gusta quedarme triste",
                option_type: ["Sanguineo", "Flematico"],
                selected: false
            },
            {
                option_text: "Me encierro en mí mismo y reflexiono mucho",
                option_type: ["Melancolico", "Supino"],
                selected: false
            }
        ]
    },
    {
        step: 5,
        question: "¿Qué lugar ocupás usualmente en un grupo de trabajo?",
        options: [
            {
                option_text: "El que propone ideas creativas y anima al equipo",
                option_type: ["Sanguineo"],
                selected: false
            },
            {
                option_text: "El que organiza, toma decisiones y dirige",
                option_type: ["Colerico"],
                selected: false
            },
            {
                option_text: "El que analiza los detalles y busca calidad",
                option_type: ["Melancolico"],
                selected: false
            },
            {
                option_text: "El que apoya desde atrás, sin buscar protagonismo",
                option_type: ["Flematico", "Supino"],
                selected: false
            }
        ]
    }
];

