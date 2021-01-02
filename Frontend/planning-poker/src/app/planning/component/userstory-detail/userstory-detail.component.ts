import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserStory } from '../../model/userStory';
import { User } from '../../model/user';

@Component({
  selector: 'app-userstory-detail',
  templateUrl: './userstory-detail.component.html',
  styleUrls: ['./userstory-detail.component.css'],
})
export class UserstoryDetailComponent implements OnInit {
  @Input() userStory: UserStory;
  @Output() userStoryCancelled: EventEmitter<void> = new EventEmitter<void>();

  @Input() users: User[] = [];
  reveal: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  revealed(): void {
    this.reveal = true;
  }

  cancel(): void {
    this.userStoryCancelled.emit();
  }
}
