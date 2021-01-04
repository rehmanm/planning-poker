import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { SignalRConnectionInfo, UserStory } from '../model';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private signalrUrl: string = 'api/signalr';
  gameId: string;
  userId: string;
  public hubConnection: signalR.HubConnection;

  userStory: Subject<UserStory> = new Subject();

  constructor(private http: HttpClient) {}

  private getConnectionInfo(): Observable<SignalRConnectionInfo> {
    return this.http.get<SignalRConnectionInfo>(`${this.signalrUrl}/negotiate`);
  }

  public startConnection(gameId: string, userId: string) {
    this.gameId = gameId;
    this.userId = userId;

    if (this.hubConnection) {
      this.joinRoom(gameId, userId).subscribe(() => {
        console.log('connected');
      });
    }

    this.getConnectionInfo().subscribe((info) => {
      const options = {
        accessTokenFactory: () => info.accessToken,
      };

      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(info.url, options)
        .configureLogging(signalR.LogLevel.Information)
        .configureLogging(signalR.LogLevel.Warning)
        .build();

      this.hubConnection
        .start()
        .then(() => {
          console.log('connection started');
          this.joinRoom(gameId, userId).subscribe(() => {
            console.log('connected');
          });
        })
        .catch((err) => {
          console.error(err);
        });

      this.hubConnection.on(`playUserStory${this.gameId}`, (data) => {
        console.log('playUserStory', 'data', data);
        this.userStory.next(data);
      });
    });
  }

  public joinRoom = (gameId: string, userId: string) => {
    return this.http.post(`${this.signalrUrl}/game/addUser`, {
      gameId,
      userId,
    });
  };

  public startUserStoryPlay = (userStory: UserStory) => {
    const u = userStory;
    this.http
      .post(`${this.signalrUrl}/game/startUserStoryPlay`, u)
      .subscribe(() => {
        console.log('startUserStoryPlay', u);
      });
  };

  public closeConnection() {
    this.http.post(`${this.signalrUrl}/game/removeUser`, {
      gameId: this.gameId,
      userId: this.userId,
    });
    this.hubConnection.stop();
  }
}
