import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserManagementComponent } from './user/user.component';
import { UploadComponent } from './uploadgoalplan/uploadgoalplan.component';
import { KeyResultUploadComponent } from './keyresultupload/keyresultupload.component';
import { TaskComponent } from './task/task.component';
import { UserUploadComponent } from './user-upload/user-upload.component';
import { TaskUploadComponent } from './task-upload/task-upload.component';
import { ReviewCycleUploadComponent } from './review-cycle-upload/review-cycle-upload.component';
import { GoalplanFormComponent } from './goalplan-form/goalplan-form.component';
import { KeyresultFormComponent } from './keyresult-form/keyresult-form.component';
import { ReviewcycleFormComponent } from './reviewcycle-form/reviewcycle-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ParentUserComponent } from './parent-user/parent-user.component';
import { ParentGoalplanComponent } from './parent-goalplan/parent-goalplan.component';
import { ParentReviewcycleComponent } from './parent-reviewcycle/parent-reviewcycle.component';
import { ParentKeyresultComponent } from './parent-keyresult/parent-keyresult.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HierarchyComponent } from './hierarchy/hierarchy.component';
import { DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { NgxOrgChartModule } from 'ngx-org-chart';
import { RouterModule } from '@angular/router';
import { OrgchartModule } from '@dabeng/ng-orgchart';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { ExportService } from './export.service';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    UserManagementComponent,
    UploadComponent,
    KeyResultUploadComponent,
    TaskComponent,
    UserUploadComponent,
    TaskUploadComponent,
    ReviewCycleUploadComponent,
    GoalplanFormComponent,
    KeyresultFormComponent,
    ReviewcycleFormComponent,
    AdminPageComponent,
    ParentUserComponent,
    ParentGoalplanComponent,
    ParentReviewcycleComponent,
    ParentKeyresultComponent,
    HierarchyComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    DiagramModule,
    AppRoutingModule,
  
  OrganizationChartModule,
 
    
  ],
  providers: [ExportService],
  bootstrap: [AppComponent, HierarchyComponent]
})
export class AppModule { }
