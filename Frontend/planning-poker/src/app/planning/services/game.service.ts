import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Game } from '../model/game';
 

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameUrl: string = "api/games";
  private games: Game[];

  constructor(private http: HttpClient) { }

  getGames(): Observable<Game[]> {

    if(this.games){
      return of(this.games);
    }

    return this.http.get<Game[]>(this.gameUrl).pipe(
      tap(data => console.log(data)),
      tap(data => this.games = data),
      catchError(this.handleError)
    )
  }

  getGame(gameId: string): Observable<Game> {
    const url = `${this.gameUrl}/getgame/${gameId}`;
    return this.http.get<Game>(url).pipe(
      tap(data => console.log("loading game", data)),
      catchError(this.handleError)
    )
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
