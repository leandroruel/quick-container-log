import { openai } from "../config/openai";

export const createChatCompletion = async (prompt: string, model?: string) => {
  try {
    const defaultModel = "text-davinci-003";
    return await openai.createCompletion({
      model: model ? model : defaultModel,
      prompt: prompt,
      temperature: 0,
      max_tokens: 7,
    });
  } catch (err: any) {
    throw new Error(err);
  }
};
