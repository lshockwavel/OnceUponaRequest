import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { ValueSchema } from '../models/Value.js'
import { PromptSchema } from '../models/Prompt.js';
import { StorySchema } from '../models/Story.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Prompt = mongoose.model('Prompt', PromptSchema);
  Story = mongoose.model('Story', StorySchema);
}

export const dbContext = new DbContext()
