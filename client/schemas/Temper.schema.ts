import { z } from "zod";

const temperamentTypeEnum = z.enum(["Colerico", "Melancolico", "Flematico", "Sanguineo", "Supino"]);

export const temperamentOptionSchema = z.object({
  option_text: z.string().min(1, "El texto de la opción no puede estar vacío"),
  option_type: z.array(temperamentTypeEnum).nonempty("Debe tener al menos un tipo de temperamento"),
  selected: z.boolean()
});

export const temperamentSchema = z.object({
  step: z.number().min(1),
  question: z.string().min(1, "La pregunta no puede estar vacía"),
  options: z.array(temperamentOptionSchema).nonempty("Debe haber al menos una opción")
});

export const temperWizardSchema = z.array(temperamentSchema);

export type TemperamentType = z.infer<typeof temperamentTypeEnum>;
export type TemperamentOption = z.infer<typeof temperamentOptionSchema>;
export type TemperamentQuestion = z.infer<typeof temperamentSchema>;
export type TemperamentWizardType = z.infer<typeof temperWizardSchema>;