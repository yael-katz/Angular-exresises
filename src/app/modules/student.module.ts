import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { StudentsListComponent } from "./students/students-list/students-list.component";
import { StudentDetailsComponent } from "./students/student-details/student-details.component";
import { StudentAvrageComponent } from "./students/student-avrage/student-avrage.component";
import { SearchStudentsComponent } from "./students/search-students/search-students.component";
import { StudentService } from "../sevices/student.service";


@NgModule({
    declarations: [StudentsListComponent,  StudentDetailsComponent, StudentAvrageComponent, SearchStudentsComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
    providers: [StudentService],
    exports:[StudentsListComponent, StudentAvrageComponent]
})
export class StudentModule {

}