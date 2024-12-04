import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from './app.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
    declarations: [AppComponent, StudentsListComponent,  StudentDetailsComponent],
    imports: [BrowserModule, FormsModule, ReactiveFormsModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}