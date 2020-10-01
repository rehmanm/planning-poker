import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Subject } from 'rxjs';
import { UserStory } from '../model/userStory';

@Injectable({
  providedIn: 'root'
})
export class SignalrDefaultService {

  private signalrUrl: string = "https://localhost:44387/planning";
  gameId: string;
  userId: string;
  public hubConnection: signalR.HubConnection;

  userStory: Subject<UserStory> = new Subject();

  constructor() {
  }

  public async startConnection(gameId: string, userId: string) {

    this.gameId = gameId;
    this.userId = userId;

    if (this.hubConnection) {
      this.joinRoom(gameId, userId);
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.signalrUrl, signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling)
      .withAutomaticReconnect()
      .build();

      
    this.hubConnection.keepAliveIntervalInMilliseconds = 1000;

    await this.hubConnection.start();
    
    this.joinRoom(gameId, userId);
    
    this.hubConnection.on(`playUserStory`, data => {
      console.log("playUserStory", "data", data);
      this.userStory.next(data);
    });

    this.hubConnection.onreconnecting((data) => {
      console.log("onreconnecting", data);
    });

    this.hubConnection.onreconnected((data)=> {
      console.log("reconnected: ", data)
      this.joinRoom(this.gameId, this.userId);
    });

  }
  public joinRoom = (gameId: string, userId: string) => {
    this.hubConnection.send("addToGroup", gameId);
  }

  public startUserStoryPlay = (userStory: UserStory) => {
    const u = userStory;
    this.hubConnection.send("startUserStoryPlay", u);
  }

  public async closeConnection(){
    this.hubConnection.send("removeFromGroup", this.gameId);
    await this.hubConnection.stop();
  }

}
