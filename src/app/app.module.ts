import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StudentService } from "./sevices/student.service";
import { ObservablesComponent } from './observables/observables.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentModule } from "./modules/student.module";


@NgModule({
    declarations: [AppComponent, ObservablesComponent],
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, StudentModule],
    providers: [StudentService],
    bootstrap: [AppComponent]
})
export class AppModule {

}