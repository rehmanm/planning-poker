import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router, ActivatedRoute } from '@angular/router';
import { SignalrService } from '../../services/signalr.service';
import { UserStory } from '../../model/userStory';

@Component({
  selector: 'app-playgame',
  templateUrl: './playgame.component.html',
  styleUrls: ['./playgame.component.css']
})
export class PlaygameComponent implements OnInit {

  userStory: UserStory;
  gameId: string;
  constructor(private router: ActivatedRoute,
    private signalrService: SignalrService) {
    this.router.paramMap.subscribe((params) => {
      console.log("gameid", params.get("gameid"));
      this.gameId = params.get("gameid");
      this.signalrService.startConnection(params.get("gameid"), Math.random().toString(36).substring(2, 10));   
    });    
  }

  ngOnInit(): void {

    this.signalrService.userStory.subscribe((u) => {
      console.log("Updating User Story", u)
      //const us = JSON.parse(u)
      if (u.gameId === this.gameId) {
        this.userStory = u.userStoryId > 0 ? u : null;
      }
    });

  }

}
