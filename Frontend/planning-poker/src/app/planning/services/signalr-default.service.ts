import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { State } from 'src/app/store/state';
import { UserStory } from '../model';
import { PlanningPageActions } from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class SignalrDefaultService {
  private signalrUrl: string = 'https://localhost:44387/planning';
  gameId: string;
  userName: string;
  isUser: boolean;
  public hubConnection: signalR.HubConnection;

  userStory: Subject<UserStory> = new Subject();

  constructor(private store: Store<State.State>) {}

  public async startConnection(
    gameId: string,
    userName: string,
    isUser: boolean
  ) {
    this.gameId = gameId;
    this.userName = userName;
    this.isUser = isUser;

    //TODO: Needs to check this code if required.
    // if (this.hubConnection) {
    //   console.log('state', this.hubConnection.state, this.hubConnection);
    //   this.joinRoom(gameId, userName, isUser);
    // }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(
        this.signalrUrl,
        signalR.HttpTransportType.WebSockets |
          signalR.HttpTransportType.LongPolling
      )
      .withAutomaticReconnect()
      .build();

    this.hubConnection.keepAliveIntervalInMilliseconds = 1000;

    await this.hubConnection.start();

    this.hubConnection.on(`playUserStory`, (data) => {
      console.log('playUserStory', 'data', data);
      this.userStory.next(data);
    });

    this.hubConnection.onreconnecting((data) => {
      console.log('onreconnecting', data);
    });

    this.hubConnection.onreconnected((data) => {
      console.log('reconnected: ', data);
      this.joinRoom(this.gameId, this.userName, this.isUser);
    });
    this.hubConnection.on(`userAdded`, (userName) => {
      console.log('userAdded', 'data', userName);
      this.store.dispatch(
        PlanningPageActions.AddUser({
          payload: { user: { userName: userName, storyPoint: '?' } },
        })
      );
    });
    this.hubConnection.on(`userLeft`, (userName) => {
      console.log('userLeft', 'data', userName);
      this.store.dispatch(
        PlanningPageActions.DeleteUser({
          payload: { user: { userName: userName } },
        })
      );
    });

    this.hubConnection.on(`updateStoryPoint`, (userName, storyPoint) => {
      console.log('updateStoryPoint', 'data', userName);
      this.store.dispatch(
        PlanningPageActions.UpdateStoryPoint({
          payload: { userName, storyPoint },
        })
      );
    });

    this.joinRoom(gameId, userName, isUser);
  }

  public joinRoom = (gameId: string, userName: string, isUser: boolean) => {
    console.log('calling joinRoom');
    this.hubConnection.send('addToGroup', gameId, userName, isUser);
  };

  public startUserStoryPlay = (userStory: UserStory) => {
    const u = userStory;
    this.hubConnection.send('startUserStoryPlay', u);
  };

  public sendStoryPoint = (storyPoint) => {
    this.hubConnection.send(
      'sendStoryPoint',
      this.gameId,
      this.userName,
      storyPoint
    );
  };

  public async closeConnection() {
    this.hubConnection.send(
      'removeFromGroup',
      this.gameId,
      this.userName,
      this.isUser
    );
    await this.hubConnection.stop();
  }
}
