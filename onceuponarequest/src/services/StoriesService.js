import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js"


class StoriesService {

    async getAllStories() {
        const stories = await dbContext.Story.find().populate('author prompt', 'id email name picture prompt emojis');
        if (!stories) {
            throw new Error("No stories found");
        }
        return stories;
    }

    async getStoryById(storyId, userId) {
        const story = await dbContext.Story.findById(storyId).populate('author prompt');
        if (story.authorId != userId) {
            throw new Forbidden("You do not have permission to view this story");
        }

        if (!story) {
            throw new Error("Story not found");
        }
        return story;
    }

    async createStory(storyData) {
        const story = await dbContext.Story.create(storyData);
        return story;
    }

    async updateStory(storyData, userId) {
        const storyOriginal = await this.getStoryById(storyData.id, userId);
        storyOriginal.body = storyData.body ?? storyOriginal.body; // Update the body of the story
        storyOriginal.title = storyData.title ?? storyOriginal.title; // Update the title of the story
        storyOriginal.promptId = storyData.promptId ?? storyOriginal.promptId; // Update the promptId of the story

        return await dbContext.Story.findByIdAndUpdate(storyData.id, storyData, { new: true });
    }

    async deleteStory(storyId, userId) {

        const story = await this.getStoryById(storyId, userId);
        await story.deleteOne();
        return `${story.title} has been deleted`;
    }

    async getStoriesByPromptId(promptId) {
        const stories = await dbContext.Story.find({ promptId: promptId }).populate('author prompt' , 'id email name picture prompt emojis'); //?? Maybe reduce the fields returned
        if (!stories) {
            throw new Error("No stories found for this prompt");
        }
        return stories;
    }
}

export const storiesService = new StoriesService();