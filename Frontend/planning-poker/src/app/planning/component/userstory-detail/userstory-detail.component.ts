import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserStory } from '../../model/userStory';
import { User } from '../../model/user';


@Component({
  selector: 'app-userstory-detail',
  templateUrl: './userstory-detail.component.html',
  styleUrls: ['./userstory-detail.component.css']
})
export class UserstoryDetailComponent implements OnInit {

  @Input() userStory: UserStory;
  @Output() userStoryCancelled: EventEmitter<void> = new EventEmitter<void>();

  users: User[] = [];
  reveal: boolean = false;

  constructor() {
    this.users.push(
      {
        userName: "Muhammad",
        storyPoint: "3"
      }
    );
    this.users.push({
      userName: "Randy",
      storyPoint: "?"
    })

    this.users.push({
      userName: "Jessica",
      storyPoint: "?"
    })

    this.users.push({
      userName: "Aady",
      storyPoint: "?"
    })
    this.users.push({
      userName: "Mridul",
      storyPoint: "?"
    })
  }

  ngOnInit(): void {

  }

  revealed(): void {
    this.reveal = true;
  }

  cancel(): void {
    this.userStoryCancelled.emit();
  }
  
  compare(a: User, b: User) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.userName.toUpperCase();
    const bandB = b.userName.toUpperCase();
  
    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }



}
