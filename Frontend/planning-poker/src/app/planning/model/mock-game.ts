import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Game } from './game';

export class GameData implements InMemoryDbService  {

    createDb() {
        const games: Game[] = [{
            gameId: "abc",
            title: "2020-PI-Iteration 4",
            userStories: [
                {
                    userStoryId: 18256,
                    title: 'Analysis: Figure out what APIs are currently being called for remote signing. APIs will return the userGUID and PackageGUID',
                    description: 'This is detail of the user story',
                    storyPoints: '3',
                    gameId: "abc"
                },
                {
                    userStoryId: 18257,
                    title: 'Analysis: Figure out what APIs are currently being called for remote signing. APIs will return the userGUID and PackageGUID',
                    description: '',
                    storyPoints: '',
                    gameId: "abc"
                }
            ]
        }];

        return {games};
    }
}

