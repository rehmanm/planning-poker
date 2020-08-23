import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from '../../model/game';
import { Subscription, Observable, of } from 'rxjs';
import { UserStory } from '../../model/userStory';
import { map, tap } from 'rxjs/operators';
import { SignalrService } from '../../services/signalr.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  game: Game;
  sub: Subscription;
  gameTitle$: Observable<string>;
  errorMessage: string;
  userStories$: Observable<UserStory[]>;
  gameStarted: boolean;

  userStories: UserStory[];


  userStory$: Observable<UserStory>;

  constructor(
    private gameService: GameService,
    private signalRService: SignalrService
  ) {

  }

  ngOnInit(): void {
    this.sub = this.gameService.getGame("abc").subscribe({
      next: (data: Game) => {
        this.game = data;
        this.gameTitle$ = of(data.title);
        this.userStories$ = of(data.userStories);
        this.userStories = data.userStories;
      },
      error: err => this.errorMessage = err
    });

    this.signalRService.startConnection("abc", "po");
  }

  @HostListener('window:unload')
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.signalRService.closeConnection();
  }

  userStoryStarted(id: number) {
    console.log("event captured", id);
    this.gameStarted = true;

    this.userStory$ = this.userStories$.pipe(
      map(userStories => userStories.find(u => u.userStoryId === id)),
    )

    let u = this.userStories.find(u => u.userStoryId === id);
    this.signalRService.startUserStoryPlay(
      u
    )

  }

  cancel(): void {
    this.gameStarted = false;
    this.userStory$ = null;
    let u = this.userStories.find(u => u.userStoryId);
    //u.userStoryId = 0;

    let updatedUserStory = {...u, userStoryId: 0}

    this.signalRService.startUserStoryPlay(updatedUserStory);

  }

}
