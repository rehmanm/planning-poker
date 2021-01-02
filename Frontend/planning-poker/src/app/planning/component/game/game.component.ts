import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Game } from '../../model/game';
import { Observable, of, pipe } from 'rxjs';
import { UserStory } from '../../model/userStory';
import { map, tap } from 'rxjs/operators';
import { SignalrService } from '../../services/signalr.service';
import { State } from 'src/app/store/state';
import { select, Store } from '@ngrx/store';
import { PlanningPageActions } from '../../store/actions';
import { PlanningSelectors } from '../../store/selectors';
import { SignalrDefaultService } from '../../services/signalr-default.service';
import { User } from '../../model';

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
    this.game$ = this.store.pipe(select(PlanningSelectors.getGame));

    this.game$.subscribe({
      next: (data: Game) => {
        if (data) {
          this.userStories$ = of(data.userStories);
          this.userStories = data.userStories;
        }
      },
      error: (err) => (this.errorMessage = err),
    });

    this.store.dispatch(
      PlanningPageActions.LoadGame({ payload: { gameId: 'abc' } })
    );

    //this.users$ = this.store.select(pipe(PlanningSelectors.getUsers));

    this.store
      .pipe(
        select(PlanningSelectors.getUsers),
        tap((users) => (this.users = users)),
        tap(() => console.log('users', this.users))
      )
      .subscribe();
    this.signalRDefaultService.startConnection('abc', 'po', false);
  }

  @HostListener('window:unload')
  ngOnDestroy(): void {
    this.signalRDefaultService.closeConnection();
  }

  userStoryStarted(id: number) {
    console.log('event captured', id);
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

  cancel(): void {
    this.gameStarted = false;
    this.userStory$ = null;
    let u = this.userStories.find((u) => u.userStoryId);

    let updatedUserStory = { ...u, userStoryId: 0 };

    this.signalRDefaultService.startUserStoryPlay(updatedUserStory);
  }
}
