import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserStory, Game } from '../../model';

@Component({
  selector: 'app-userstory-list',
  templateUrl: './userstory-list.component.html',
  styleUrls: ['./userstory-list.component.css'],
})
export class UserstoryListComponent implements OnInit {
  @Input() gameStarted: boolean;

  @Input() game: Game;

  @Output() userStoryStarted: EventEmitter<number> = new EventEmitter<number>();
  userStories: UserStory[];
  gameTitle: string;

  constructor() {}

  ngOnInit(): void {}

  start(id: number) {
    this.userStoryStarted.emit(id);
  }
}
