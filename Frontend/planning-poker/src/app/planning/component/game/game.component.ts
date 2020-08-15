import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from '../../model/game';
import { Subscription, Observable, of } from 'rxjs';
import { UserStory } from '../../model/userStory';
import { map } from 'rxjs/operators';

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


  userStory$: Observable<UserStory>;

  constructor(
    private gameService: GameService
  ) {

  }

  ngOnInit(): void {
    this.sub = this.gameService.getGame("1").subscribe({
      next: (data: Game) => {
        this.game = data;
        this.gameTitle$ = of(data.title);
        this.userStories$ = of(data.userStories) ;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  userStoryStarted(id: number) {
    console.log("event captured", id);
    this.gameStarted = true;

    this.userStory$ = this.userStories$.pipe(
      map(userStories => userStories.find(u => u.id === id) )
    )
  }

  cancel(): void {
    this.gameStarted = false;
    this.userStory$ = null;

  }

}
