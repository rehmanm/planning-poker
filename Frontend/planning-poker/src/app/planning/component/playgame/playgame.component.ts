import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SignalrService } from '../../services/signalr.service';
import { UserStory } from '../../model/userStory';
import { ToastService } from 'src/app/shared/service/toast.service';
import { SignalrDefaultService } from '../../services/signalr-default.service';

@Component({
  selector: 'app-playgame',
  templateUrl: './playgame.component.html',
  styleUrls: ['./playgame.component.css']
})
export class PlaygameComponent implements OnInit {

  userStory: UserStory;
  gameId: string;
  userForm: FormGroup;
  userName: string;
  constructor(private router: ActivatedRoute,
    private signalrService: SignalrDefaultService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private el: ElementRef) {

    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required]
    });
  }

  start() {

    if (!this.userForm.valid) {

      this.toastService.show('User Name is required', {
        classname: 'bg-danger text-light',
        delay: 2000,
        autohide: true,
        headertext: 'Error!!'
      });

      this.el.nativeElement.querySelector('[formcontrolname="userName"]').focus();

      return;
    }
    sessionStorage.setItem("userName", this.userForm.value["userName"]);
    this.userName = sessionStorage.getItem("userName");
    this.signalrService.startConnection(this.gameId, this.userName);

  }

  ngOnInit(): void {

    this.userName = sessionStorage.getItem("userName")
    this.router.paramMap.subscribe((params) => {
      console.log("gameid", params.get("gameid"));
      this.gameId = params.get("gameid");
      if (this.userName) {
        this.signalrService.startConnection(this.gameId, this.userName);
      }
    });


    this.signalrService.userStory.subscribe((u) => {
      console.log("Updating User Story", u)
      if (u.gameId === this.gameId) {
        this.userStory = u.userStoryId > 0 ? u : null;
      }
    });

  }

}
