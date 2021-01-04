import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { ToastService } from 'src/app/shared/service/toast.service';

import { GameService, UserstoryService } from '../../services';
import { PlanningApiActions, PlanningPageActions } from '../actions';

@Injectable()
export class PlanningEffects {
  loadGame$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlanningPageActions.LoadGame),
      mergeMap((action) =>
        this.gameService.getGame(action.payload.gameId).pipe(
          map((data) =>
            PlanningApiActions.LoadGameSuccess({ payload: { game: data } })
          ),
          catchError((error) => {
            this.toastService.show(
              `Unable to get game ${action.payload.gameId} Error: ${error}`,
              {
                classname: 'bg-danger text-light',
                delay: 2000,
                autohide: true,
                headertext: 'Error!!',
              }
            );
            return of(
              PlanningApiActions.LoadGameFailure({ payload: { error: error } })
            );
          })
        )
      )
    );
  });

  updateStoryPoints$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlanningApiActions.UpdateStoryPoint),
      mergeMap((action) =>
        this.uerstoryService
          .updateStoryPoint(
            action.payload.userStoryId,
            action.payload.storyPoints
          )
          .pipe(
            map(() =>
              PlanningApiActions.UpdateStoryPointSuccessful({
                payload: {
                  storyPoints: action.payload.storyPoints,
                  userStoryId: action.payload.userStoryId,
                },
              })
            ),
            catchError((error) => {
              this.toastService.show(
                `Unable to update User Story Id ${action.payload.userStoryId} Error: ${error}`,
                {
                  classname: 'bg-danger text-light',
                  delay: 2000,
                  autohide: true,
                  headertext: 'Error!!',
                }
              );
              return of(
                PlanningApiActions.LoadGameFailure({
                  payload: { error: error },
                })
              );
            })
          )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private gameService: GameService,
    private uerstoryService: UserstoryService,
    private toastService: ToastService
  ) {}
}
