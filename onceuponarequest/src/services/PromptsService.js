import { dbContext } from "../db/DbContext.js";




class PromptsService {


    async getPrompts() {
        const prompts = await dbContext.Prompt.find();
        return prompts;
    }

    async getRandomOnePrompt() {
        const count = await dbContext.Prompt.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const prompt = await dbContext.Prompt.findOne().skip(randomIndex);
        return prompt;
    }

    async getPromptById(promptId) {
        const prompt = await dbContext.Prompt.findById(promptId);
        if (!prompt) {
            throw new Error("Prompt not found");
        }
        return prompt;
    }
}

export const promptsService = new PromptsService();