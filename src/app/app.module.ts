import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { EmmenWonDsvComponent } from './emmen-won-dsv/emmen-won-dsv.component';
import { ProjectMenuComponent } from './project-menu/project-menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ModalPlanComponent } from './emmen-won-dsv/modal-plan/modal-plan.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const appRoutes: Routes = [
  { path: 'projectmenu', component: ProjectMenuComponent },
  {
    path: 'emmen',
    component: EmmenWonDsvComponent
  },

  { path: '**', component: ProjectMenuComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ModalPlanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    NgbModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
