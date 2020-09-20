import { Game } from '../../model/game';


export interface GameState {
    game: Game,
    error: string
}

export const InitialState: GameState = {
    game: null,
    error: ''
}