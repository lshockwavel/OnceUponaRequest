import { Auth0Provider } from "@bcwdev/auth0provider";
import { promptsService } from "../services/PromptsService.js"
import BaseController from "../utils/BaseController.js";
import { storiesService } from "../services/StoriesService.js";


export class PromptController extends BaseController {
    constructor() {
        super('api')
        this.router
            .get('/prompt', this.getRandomOnePrompt)
            .get('/prompts', this.getPrompts)
            .get('/prompts/:promptId', this.getPromptById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('/prompts/:promptId/stories', this.getStoriesByPromptId)
    }

    async getPrompts(req, res, next) {
        try {
            const prompts = await promptsService.getPrompts();
            return res.send(prompts);
        } catch (error) {
            next(error);
        }
    }

    async getRandomOnePrompt(req, res, next) {
        try {
            const prompt = await promptsService.getRandomOnePrompt();
            return res.send(prompt);
        } catch (error) {
            next(error);
        }
    }

    async getPromptById(req, res, next) {
        try {
            const promptId = req.params.promptId;
            const prompt = await promptsService.getPromptById(promptId);
            return res.send(prompt);
        } catch (error) {
            next(error);
        }
    }

    async getStoriesByPromptId(req, res, next) {
        try {
            const promptId = req.params.promptId;
            const stories = await storiesService.getStoriesByPromptId(promptId);
            return res.send(stories);
        } catch (error) {
            next(error);
        }
    }
}