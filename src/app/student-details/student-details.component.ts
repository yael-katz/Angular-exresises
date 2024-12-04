import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student, Year } from '../models/student.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course, COURSES_LIST } from '../models/course.model';

@Component({
  selector: 'student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent {

  coursesList: Course[] = COURSES_LIST
  year = Year
  studentForm!: FormGroup;
  private _student!: Student

  public get student():Student {
    return this._student
  }

  @Input()
  public set student(value: Student){
    this._student = value
    this.studentForm = new FormGroup({
      'id': new FormControl(this._student.id),
      'name': new FormControl(this._student.name,[Validators.required,Validators.minLength(4),Validators.maxLength(12)]),
      'deparureDate': new FormControl(this._student.deparureDate),
      "avrage": new FormControl(this._student.avrage, [Validators.max(100),Validators.min(0)]),
      "isActive": new FormControl(this._student.isActive, Validators.requiredTrue),
      'year': new FormControl(this._student.year, Validators.required),
      "course": new FormControl(this._student.course, Validators.required)
    })
  }

  next:number = Student.nextId
  
  

  @Output()
  onSave: EventEmitter<Student> = new EventEmitter(); 
  @Output()
  onClose: EventEmitter<any> = new EventEmitter(); 

  submit(){
    let saveStudent: Student = this.studentForm.value
    this.onSave.emit(saveStudent)
  }

  close(){
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    
    this.onClose.emit()
  }

  flag = false

  trySubmit(){
    this.flag = true
  }
}
