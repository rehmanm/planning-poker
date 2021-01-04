import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserstoryService {
  private userStoryUrl: string = '/userStories';

  constructor(private http: HttpClient) {}

  updateStoryPoint(userStoryId: number, storyPoints: string) {
    const url = `${this.userStoryUrl}/${userStoryId}/storyPoint`;

    return this.http.patch(url, { storyPoints });
  }
}
