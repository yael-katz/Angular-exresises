import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student, Year } from '../models/student.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course, COURSES_LIST } from '../models/course.model';
import { AbsenceDays } from '../models/absenceDays.model';
import { StudentService } from '../sevices/student.service';

@Component({
  selector: 'student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent {

  coursesList: Course[] = COURSES_LIST
  year = Year
  studentForm!: FormGroup;
  totalAbsenceDays!: number
  private _student!: Student


  constructor(private _studentService: StudentService){

  }

  async ngOnInit(){
    this.totalAbsenceDays = await this._studentService.getAllAbsenceDays(this._student.id)
  }

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
      'avrage': new FormControl(this._student.avrage, [Validators.max(100),Validators.min(0)]),
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

  submit(fromDateInput: Date|null, daysInput: number){
    let absenceDaysArray: AbsenceDays[] = this._student.absenceDays
    if(fromDateInput && daysInput>0)
      absenceDaysArray.push(new AbsenceDays(fromDateInput,daysInput))
    
    let saveStudent: Student = this.studentForm.value
    saveStudent.absenceDays = absenceDaysArray
    
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
