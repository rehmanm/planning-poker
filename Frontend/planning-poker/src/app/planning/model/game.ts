import { UserStory } from './userStory';

export interface Game {
    id: string;
    title: string;
    userStories: UserStory[];
}