import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from '../../model/game';
import { Subscription, Observable, of } from 'rxjs';
import { UserStory } from '../../model/userStory';

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
  userStories$: Observable<UserStory[]>

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

}
