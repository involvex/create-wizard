import dotenv from 'dotenv';
dotenv.config();

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const MODELS = {
  TEXT_ONLY: 'gemini-pro',
  TEXT_AND_IMAGE: 'gemini-pro-vision',
  // Add other models as they become available
};

export const DEFAULT_MODEL = MODELS.TEXT_ONLY;

export function getModel(type = DEFAULT_MODEL) {
  if (!Object.values(MODELS).includes(type)) {
    console.warn(`Model type "${type}" not recognized. Using default model: ${DEFAULT_MODEL}`);
    return DEFAULT_MODEL;
  }
  return type;
}
