import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './component/game/game.component';
import { PlanningRoutingModule } from './planning.routing.module';
import { UserstoryListComponent } from './component/userstory-list/userstory-list.component';
import { UserstoryDetailComponent } from './component/userstory-detail/userstory-detail.component';
import { PlaygameComponent } from './component/playgame/playgame.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [GameComponent, UserstoryListComponent, UserstoryDetailComponent, PlaygameComponent],
  imports: [
    CommonModule,
    PlanningRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PlanningModule { }
