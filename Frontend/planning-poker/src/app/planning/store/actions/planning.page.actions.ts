import { createAction, props } from '@ngrx/store';
import { User } from '../../model';

export const LoadGame = createAction(
  '[Game Page] Load Game',
  props<{ payload: { gameId: string } }>()
);

export const AddUser = createAction(
  '[Game Page] Add User',
  props<{ payload: { user: User } }>()
);

export const DeleteUser = createAction(
  '[Game Page] Delete User',
  props<{ payload: { user: User } }>()
);

export const UpdateStoryPoint = createAction(
  '[Game Page] Update Story Point',
  props<{ payload: { userName: string; storyPoint: string } }>()
);
