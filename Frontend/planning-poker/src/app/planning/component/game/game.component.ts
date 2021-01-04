import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { State } from 'src/app/store/state';
import { select, Store } from '@ngrx/store';

import { PlanningPageActions } from '../../store/actions';
import { PlanningSelectors } from '../../store/selectors';
import { SignalrDefaultService } from '../../services';
import { Game, UserStory, User } from '../../model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnDestroy {
  errorMessage: string;
  userStories$: Observable<UserStory[]>;
  gameStarted: boolean;

  userStories: UserStory[];

  userStory$: Observable<UserStory>;
  game$: Observable<Game>;
  users: User[];

  constructor(
    private store: Store<State.State>,
    private signalRDefaultService: SignalrDefaultService
  ) {}

  ngOnInit(): void {
    this.game$ = this.store.pipe(
      select(PlanningSelectors.getGame),
      tap((data: Game) => {
        if (data) {
          this.userStories$ = of(data.userStories);
          this.userStories = data.userStories;
          this.signalRDefaultService.startConnection(data.gameId, 'po', false);
        }
      })
    );

    this.game$.subscribe();

    this.store.dispatch(
      PlanningPageActions.LoadGame({ payload: { gameId: 'abc' } })
    );

    this.store
      .pipe(
        select(PlanningSelectors.getUsers),
        tap((users) => (this.users = users)),
        tap(() => console.log('users', this.users))
      )
      .subscribe();
  }

  @HostListener('window:unload')
  ngOnDestroy(): void {
    this.signalRDefaultService.closeConnection();
  }

  userStoryStarted(id: number) {
    this.gameStarted = true;

    this.userStory$ = this.userStories$.pipe(
      map((userStories) => userStories.find((u) => u.userStoryId === id))
    );

    let u = this.userStories.find((u) => u.userStoryId === id);

    this.users.forEach((user) =>
      this.store.dispatch(
        PlanningPageActions.UpdateStoryPoint({
          payload: { userName: user.userName, storyPoint: '?' },
        })
      )
    );
    this.signalRDefaultService.startUserStoryPlay(u);
  }

  done(): void {
    this.gameStarted = false;
    this.userStory$ = null;
    let u = this.userStories.find((u) => u.userStoryId);

    let updatedUserStory = { ...u, userStoryId: 0 };

    this.signalRDefaultService.startUserStoryPlay(updatedUserStory);
  }
}
