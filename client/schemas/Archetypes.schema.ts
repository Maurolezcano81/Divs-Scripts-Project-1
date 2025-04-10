import { z } from "zod";

const archetypeEnum = z.enum([
    "Inocente",
    "Explorador",
    "Sabio",
    "Héroe",
    "Forajido",
    "Mago",
    "Amante",
    "Cuidador"
]);

const archetypeOptionSchema = z.object({
    option_text: z.string().min(1, "El texto de la opción no puede estar vacío"),
    option_type: z.array(archetypeEnum).nonempty("Debe tener al menos un tipo de temperamento"),
    selected: z.boolean()
});

export const archetyQuestionSchema = z.object({
    step: z.number().min(1),
    question: z.string().min(1, "La pregunta no puede estar vacía"),
    options: z.array(archetypeOptionSchema).nonempty("Debe haber al menos una opción")
});
export const archetypeWizardSchema = z.array(archetyQuestionSchema);


export type archetypeWizardType = z.infer<typeof archetypeWizardSchema>;

export type ArchetypeOption = z.infer<typeof archetypeOptionSchema>;
export type ArchetypeQuestion = z.infer<typeof archetyQuestionSchema>;
