import {
  Component,
  OnInit,
  ElementRef,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ToastService } from 'src/app/shared/service/toast.service';

import { SignalrDefaultService } from '../../services/signalr-default.service';
import { UserStory } from '../../model/userStory';

@Component({
  selector: 'app-playgame',
  templateUrl: './playgame.component.html',
  styleUrls: ['./playgame.component.css'],
})
export class PlaygameComponent implements OnInit, OnDestroy {
  userStory: UserStory;
  gameId: string;
  userForm: FormGroup;
  userName: string;

  storyPointForm: FormGroup;
  storyPoints: number;

  constructor(
    private router: ActivatedRoute,
    private signalrDefaultService: SignalrDefaultService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private el: ElementRef
  ) {
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
    });

    this.storyPointForm = this.formBuilder.group({
      storyPoint: ['', Validators.required],
    });
  }

  start() {
    if (!this.userForm.valid) {
      this.toastService.show('User Name is required', {
        classname: 'bg-danger text-light',
        delay: 2000,
        autohide: true,
        headertext: 'Error!!',
      });

      this.el.nativeElement
        .querySelector('[formcontrolname="userName"]')
        .focus();

      return;
    }
    sessionStorage.setItem('userName', this.userForm.value['userName']);
    this.userName = sessionStorage.getItem('userName');
    this.signalrDefaultService.startConnection(
      this.gameId,
      this.userName,
      true
    );

    window.onunload = (event) => {
      console.log('unload');
      this.signalrDefaultService.closeConnection();
    };
  }

  sendStoryPoint(): void {
    if (!this.storyPointForm.valid) {
      this.toastService.show('Story Point is required', {
        classname: 'bg-danger text-light',
        delay: 2000,
        autohide: true,
        headertext: 'Error!!',
      });

      this.el.nativeElement
        .querySelector('[formcontrolname="storyPoint"]')
        .focus();

      return;
    }

    this.signalrDefaultService.sendStoryPoint(
      this.storyPointForm.value['storyPoint']
    );
  }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('userName');
    this.router.paramMap.subscribe((params) => {
      console.log('gameid', params.get('gameid'));
      this.gameId = params.get('gameid');
      if (this.userName) {
        this.signalrDefaultService.startConnection(
          this.gameId,
          this.userName,
          true
        );
      }
    });

    this.signalrDefaultService.userStory.subscribe((u) => {
      console.log('Updating User Story', u);
      if (u.gameId === this.gameId) {
        this.userStory = u.userStoryId > 0 ? u : null;
      }
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.signalrDefaultService.closeConnection();
  }
}
