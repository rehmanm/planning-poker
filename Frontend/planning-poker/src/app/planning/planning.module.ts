import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './component/game/game.component';
import { PlanningRoutingModule } from './planning.routing.module';
import { UserstoryListComponent } from './component/userstory-list/userstory-list.component';



@NgModule({
  declarations: [GameComponent, UserstoryListComponent],
  imports: [
    CommonModule,
    PlanningRoutingModule
  ]
})
export class PlanningModule { }
