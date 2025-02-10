import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from './app.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StudentService } from "./sevices/student.service";
import { StudentAvrageComponent } from './student-avrage/student-avrage.component';
import { ObservablesComponent } from './observables/observables.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchStudentsComponent } from './search-students/search-students.component';  


@NgModule({
    declarations: [AppComponent, StudentsListComponent,  StudentDetailsComponent, StudentAvrageComponent, ObservablesComponent, SearchStudentsComponent],
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
    providers: [StudentService],
    bootstrap: [AppComponent]
})
export class AppModule {

}