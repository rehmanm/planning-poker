import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserStory } from '../../model/userStory';
import { User } from '../../model/user';

@Component({
  selector: 'app-userstory-list',
  templateUrl: './userstory-list.component.html',
  styleUrls: ['./userstory-list.component.css']
})
export class UserstoryListComponent implements OnInit {

  @Input() gameTitle: string;
  @Input() userStories: UserStory[];
  @Input() gameStarted: boolean;

  @Output() userStoryStarted: EventEmitter<number> = new EventEmitter<number>();

  
  constructor() { 


  }

  ngOnInit(): void {

    console.log("userStories", this.userStories)
  }

  start(id: number) {
    this.userStoryStarted.emit(id);
  }

  

}
