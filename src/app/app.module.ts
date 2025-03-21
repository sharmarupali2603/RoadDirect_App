import { NgModule, isDevMode,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DashboardComponent } from './Page/dashboard/dashboard.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { HttpClientModule } from '@angular/common/http';
import { SiteInspectionComponent } from './Page/site-inspection/site-inspection.component';
import { TSLComponent } from './Page/tsl/tsl.component';
import { CalenderComponent } from './Components/calender/calender.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { StopwatchComponent } from './Components/stopwatch/stopwatch.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { JobCardComponent } from './Components/job-card/job-card.component';
import { JobExpandComponent } from './Page/job-expand/job-expand.component';
import { TasksComponent } from './Page/tasks/tasks.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { Storage } from '@ionic/storage';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SiteInspectionComponent,
    TSLComponent,
    CalenderComponent,
    HeaderComponent,
    FooterComponent,
    StopwatchComponent,
    JobCardComponent,
    JobExpandComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,ReactiveFormsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatNativeDateModule,MatDatepickerModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    BsDatepickerModule.forRoot(),
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
