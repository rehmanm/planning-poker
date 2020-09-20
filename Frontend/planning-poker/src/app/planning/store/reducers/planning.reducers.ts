import { PlanningPageActions, PlanningApiActions } from '../actions';
import { Action, createReducer, on } from '@ngrx/store';
import { PlanningState } from '../state';

const planningReducer = createReducer(
    PlanningState.InitialState,
    on(PlanningApiActions.LoadGameSuccess, (state, { payload }) => ({ ...state, game: payload.game  })),
    on(PlanningApiActions.LoadGameFailure, (state, { payload }) => ({ ...state, game: null, error: payload.error  })),    
);

export function reducer(state: PlanningState.GameState | undefined, action: Action) {
    return planningReducer(state, action);
}