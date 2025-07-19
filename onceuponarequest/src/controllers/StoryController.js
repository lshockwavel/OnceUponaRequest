import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { storiesService } from "../services/StoriesService.js";



export class StoryController extends BaseController {
    constructor() {
        super('api/stories');
        this.router
        .get('', this.getAllStories)
        .get('/:storyId', this.getStoryById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createStory)
            .put('/:storyId', this.updateStory)
            .delete('/:storyId', this.deleteStory);
    }

    async getAllStories(req, res, next) {
        try {
            //
            const stories = await storiesService.getAllStories();
            return res.send(stories);
        } catch (error) {
            next(error);
        }
    }

    async getStoryById(req, res, next) {
        try {
            const storyId = req.params.storyId;
            // const userId = req.userInfo.id;
            const story = await storiesService.getStoryById(storyId);
            return res.send(story);
        } catch (error) {
            next(error);
        }
    }

    async createStory(req, res, next) {
        try {
            const storyData = req.body;
            const user = req.userInfo;
            storyData.authorId = user.id; // Set the authorId to the current user's id
            const story = await storiesService.createStory(storyData);
            res.status(201).send(story);
        } catch (error) {
            next(error);
        }
    }

    async updateStory(req, res, next) {
        try {
            const storyId = req.params.storyId;
            const storyData = req.body;

            storyData.id = storyId; // Ensure the storyId is included in the data
            const userId = req.userInfo.id;

            const updatedStory = await storiesService.updateStory(storyData, userId);
            return res.send(updatedStory);
        } catch (error) {
            next(error);
        }
    }

    async deleteStory(req, res, next) {
        try {
            const storyId = req.params.storyId;
            const userId = req.userInfo.id;

           const message = await storiesService.deleteStory(storyId, userId);
            return res.send(message);
        } catch (error) {
            next(error);
        }
    }
}