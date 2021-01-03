import { createAction, props } from '@ngrx/store';
import { Game } from '../../model/game';

export const LoadGameSuccess = createAction(
  '[Game Api] Load Game Success',
  props<{ payload: { game: Game } }>()
);

export const LoadGameFailure = createAction(
  '[Game Api] Load Game Failure',
  props<{ payload: { error: string } }>()
);

export const UpdateStoryPoint = createAction(
  '[Game Api] Update Story Point',
  props<{ payload: { userStoryId: number; storyPoints: string } }>()
);

export const UpdateStoryPointSuccessful = createAction(
  '[Game Api] Update Story Point Successful',
  props<{ payload: { userStoryId: number; storyPoints: string } }>()
);
