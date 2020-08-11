import { Component, OnInit, Input } from '@angular/core';
import { UserStory } from '../../model/userStory';

@Component({
  selector: 'app-userstory-list',
  templateUrl: './userstory-list.component.html',
  styleUrls: ['./userstory-list.component.css']
})
export class UserstoryListComponent implements OnInit {

  @Input() gameTitle: string;
  @Input() userStories: UserStory[];
  gameStarted: boolean;

  constructor() { 


  }

  ngOnInit(): void {

    console.log("userStories", this.userStories)
  }

  start(id: number) {
    console.log("starting id", id)
    this.gameStarted = true;
  }

}
