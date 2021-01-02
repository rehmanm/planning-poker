import { Game, User } from '../../model';

export interface GameState {
  game: Game;
  error: string;
  users: User[];
}

export const InitialState: GameState = {
  game: null,
  error: '',
  users: [],
};
