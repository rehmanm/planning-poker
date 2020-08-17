import { UserStory } from './userStory';

export interface Game {
    gameId: string;
    title: string;
    userStories: UserStory[];
}