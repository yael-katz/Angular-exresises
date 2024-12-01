import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../students-list/student-model';

@Component({
  selector: 'student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent {
  @Input()
  student!: Student

  next:number = Student.nextId
  // constructor() {
  //   console.log(this.student,"ssssssssssssssssssssssssssssssssssssssssssssssss");
    
  //   if (this.student) {
  //     console.log("11111111111111111111");
      
  //     this.editStudent=this.student
  //   }
  //   else{
  //     console.log("222222222222222222222222222");
      
  //     this.editStudent=new Student(1,"aaa")
  //   }  
  // }
  

  @Output()
  onSave: EventEmitter<Student> = new EventEmitter(); 
  @Output()
  onClose: EventEmitter<any> = new EventEmitter(); 

  confirm(saveStudent: Student){
    this.onSave.emit(saveStudent)
  }

  close(){
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    
    this.onClose.emit()
  }

}
