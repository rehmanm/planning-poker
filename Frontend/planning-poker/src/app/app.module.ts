import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { GameData } from './planning/model/mock-game';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PlanningModule } from './planning/planning.module';
import { BaseUrlInterceptorService } from './services/base-url-interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,    
    HttpClientModule,
    NgbModule,
    //HttpClientInMemoryWebApiModule.forRoot(GameData),
    PlanningModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: BaseUrlInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
