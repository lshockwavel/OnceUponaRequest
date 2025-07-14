import { Schema } from "mongoose";



export const StorySchema = new Schema({
    published: { type: Boolean, default: false },
    title: { type: String, minLength: 1, maxLength: 250, required: true },
    body: { type: String, minLength: 1, maxLength: 250, required: true },
    authorId: { type: Schema.ObjectId, ref: 'Account', required: true },
    promptId: { type: Schema.ObjectId, ref: 'Prompt', required: true }
}, { timestamps: true, toJSON: { virtuals: true }  });

StorySchema.virtual('author', {
    localField: 'authorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
});

StorySchema.virtual('prompt', {
    localField: 'promptId',
    foreignField: '_id',
    ref: 'Prompt',
    justOne: true
});
