import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { EmmenWonDsvComponent } from './emmen-won-dsv/emmen-won-dsv.component';
import { ProjectMenuComponent } from './project-menu/project-menu.component';
import { ModalPlanComponent } from './modal-plan/modal-plan.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from './appointment.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule }    from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MomentPipe } from './moment-pipe';
import { DatePickerComponent } from './modal-plan/date-picker/date-picker.component';
import { NotificationAreaComponent } from './modal-plan/notification-area/notification-area.component';
import { StartEndTimeComponent } from './modal-plan/start-end-time/start-end-time.component';
import { StartComponent } from './modal-plan/start-end-time/start/start.component';
import { UpArrowIconComponent } from './modal-plan/start-end-time/up-arrow-icon/up-arrow-icon.component';
import { DownArrowIconComponent } from './modal-plan/start-end-time/down-arrow-icon/down-arrow-icon.component';
import { InputBoxComponent } from './modal-plan/start-end-time/input-box/input-box.component';


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
    ModalPlanComponent,
    EmmenWonDsvComponent, ProjectMenuComponent,MomentPipe, DatePickerComponent, NotificationAreaComponent, StartEndTimeComponent, StartComponent, UpArrowIconComponent, DownArrowIconComponent, InputBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [AppointmentService,DatePipe,HttpClient,MomentPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
