import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlanningState } from '../state';

const getGameFeatureState = createFeatureSelector<PlanningState.GameState>(
  'game'
);

export const getGame = createSelector(
  getGameFeatureState,
  (state) => state.game
);

export const getUsers = createSelector(
  getGameFeatureState,
  (state) => state.users
);
