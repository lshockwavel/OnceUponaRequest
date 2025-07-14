import { Schema } from "mongoose";

export const PromptSchema = new Schema({
    prompt: { type: String, required: true },
    emojis: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })