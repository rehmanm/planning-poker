import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { GameData } from './planning/model/mock-game';
import { HttpClientModule } from '@angular/common/http';
import { PlanningModule } from './planning/planning.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,    
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(GameData),
    PlanningModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
