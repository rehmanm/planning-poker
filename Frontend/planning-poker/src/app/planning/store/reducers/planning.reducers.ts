import { PlanningPageActions, PlanningApiActions } from '../actions';
import { Action, createReducer, on } from '@ngrx/store';

import { PlanningState } from '../state';
import { User } from '../../model';

const planningReducer = createReducer(
  PlanningState.InitialState,
  on(PlanningApiActions.LoadGameSuccess, (state, { payload }) => ({
    ...state,
    game: payload.game,
  })),
  on(PlanningApiActions.LoadGameFailure, (state, { payload }) => ({
    ...state,
    game: null,
    error: payload.error,
  })),
  on(PlanningPageActions.AddUser, (state, { payload }) => {
    const users = [...state.users];
    let newUser = false;
    if (users.findIndex((x) => x.userName === payload.user.userName) === -1) {
      users.push(payload.user);
      newUser = true;
    }

    return {
      ...state,
      users: newUser ? users.sort(compare) : users,
    };
  }),
  on(PlanningPageActions.DeleteUser, (state, { payload }) => ({
    ...state,
    users: state.users.filter(
      (user) => user.userName !== payload.user.userName
    ),
  })),
  on(PlanningPageActions.UpdateStoryPoint, (state, { payload }) => {
    const users = [...state.users];
    const newUser = {
      userName: payload.userName,
      storyPoint: payload.storyPoint,
    };
    const updatedUser = users.map((user) =>
      user.userName === payload.userName ? newUser : user
    );

    return {
      ...state,
      users: updatedUser,
    };
  })
);

function compare(a: User, b: User) {
  // Use toUpperCase() to ignore character casing
  const bandA = a.userName.toUpperCase();
  const bandB = b.userName.toUpperCase();

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison;
}

export function reducer(
  state: PlanningState.GameState | undefined,
  action: Action
) {
  return planningReducer(state, action);
}
