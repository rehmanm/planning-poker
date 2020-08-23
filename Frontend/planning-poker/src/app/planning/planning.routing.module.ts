import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './component/game/game.component';
import { PlaygameComponent } from './component/playgame/playgame.component';

const routes: Routes = [
  {
    path: '',
    component: GameComponent
  },
  {
    path: 'play/:gameid',
    component: PlaygameComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanningRoutingModule {}
