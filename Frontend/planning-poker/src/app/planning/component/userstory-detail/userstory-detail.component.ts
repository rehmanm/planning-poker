import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from 'src/app/store/state';

import { PlanningApiActions } from '../../store/actions';
import { UserStory, User } from '../../model';

@Component({
  selector: 'app-userstory-detail',
  templateUrl: './userstory-detail.component.html',
  styleUrls: ['./userstory-detail.component.css'],
})
export class UserstoryDetailComponent implements OnInit {
  @Input() userStory: UserStory;
  @Output() done: EventEmitter<void> = new EventEmitter<void>();
  storyPoints: string;

  @Input() users: User[] = [];
  reveal: boolean = false;

  constructor(private store: Store<State.State>) {}

  ngOnInit(): void {}

  revealed(): void {
    this.reveal = true;
  }

  cancel(): void {
    this.done.emit();
  }

  accept(): void {
    this.store.dispatch(
      PlanningApiActions.UpdateStoryPoint({
        payload: {
          userStoryId: this.userStory.userStoryId,
          storyPoints: this.storyPoints,
        },
      })
    );
    this.done.emit();
    this.storyPoints = '';
  }
}
