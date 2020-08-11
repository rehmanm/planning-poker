import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Game } from './game';

export class GameData implements InMemoryDbService  {

    createDb() {
        const games: Game[] = [{
            id: "1",
            title: "2020-PI-Iteration 4",
            userStories: [
                {
                    id: 18256,
                    title: 'Analysis: Figure out what APIs are currently being called for remote signing. APIs will return the userGUID and PackageGUID',
                    description: '',
                    storyPoints: '3'
                },
                {
                    id: 18257,
                    title: 'Analysis: Figure out what APIs are currently being called for remote signing. APIs will return the userGUID and PackageGUID',
                    description: '',
                    storyPoints: ''
                }
            ]
        }];

        return {games};
    }
}

