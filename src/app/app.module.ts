import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalenderComponent } from './Components/calender/calender.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { JobCardComponent } from './Components/job-card/job-card.component';
import { StopwatchComponent } from './Components/stopwatch/stopwatch.component';
import { AddNoteComponent } from './Page/add-note/add-note.component';
import { CreateRecordTaskComponent } from './Page/create-record-task/create-record-task.component';
import { DashboardComponent } from './Page/dashboard/dashboard.component';
import { EditEquipmentComponent } from './Page/edit-equipment/edit-equipment.component';
import { EditTimeComponent } from './Page/edit-time/edit-time.component';
import { JobExpandComponent } from './Page/job-expand/job-expand.component';
import { LocationComponent } from './Page/location/location.component';
import { SiteInspectionComponent } from './Page/site-inspection/site-inspection.component';
import { TasksComponent } from './Page/tasks/tasks.component';
import { TSLComponent } from './Page/tsl/tsl.component';
import { SafeUrlPipe } from './safe-url.pipe';
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
    TasksComponent,
    LocationComponent,
    SafeUrlPipe,
    CreateRecordTaskComponent,
    EditTimeComponent,
    AddNoteComponent,
    EditEquipmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    BrowserAnimationsModule,
    MatIconModule, MatDatepickerModule, MatNativeDateModule, MatToolbarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor(private iconRegistry: MatIconRegistry) {
    const defaultFontSetClasses = iconRegistry.getDefaultFontSetClass();
    iconRegistry.setDefaultFontSetClass(...defaultFontSetClasses.concat('material-icons-outlined'));
  }
}
