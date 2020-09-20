import { createAction, props } from '@ngrx/store';

export const LoadGame  = createAction(
    '[Game Page] Load Game', props<{payload: {gameId: string}}>()
);