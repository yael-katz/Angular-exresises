import { Component, numberAttribute } from '@angular/core';
import { Student } from './student-model';

@Component({
  selector: 'students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent {
  // students: Student[] = [new Student("noa"),new Student("avi"),new Student("moishie"),new Student("yael", new Date())]
  selectedStudent: Student = {id: Student.nextId, name: "" , avrage:0}

  students: Student[] = []

  showDetails: boolean = false 


  deleteStudent(student: Student){
    let studentInd: number = this.students.findIndex((studentEle: Student, index: number, obj: Student[]) => {
        return studentEle === student;
    });
    
    this.students.splice(studentInd,1)   
  }

  updateOrAdd(student: Student){
    if(student.id == Student.nextId)
      this.addStudent(student)
    else this.updateStudent(student)
    this.closeDetails()
    
  }

  addStudent(student: Student){
    console.log(student,"aaaaaaaaaaaooooooooooooooooooooooooooorrrrrrrrrrrrrrrrrrrrruuuuuuuuuuuuuuuuuuuu");

    this.students.push(new Student(student.name, student.deparureDate, student.avrage, student.isActive))
  }

  updateStudent(student: Student){
    console.log(student,"update##################################");

    let studentInd: number = this.students.findIndex((studentEle: Student, index: number, obj: Student[]) => {
        return studentEle.id == student.id;
    });
    this.students[studentInd].name = student.name
    this.students[studentInd].deparureDate = student.deparureDate
    this.students[studentInd].avrage = student.avrage
  }

  closeDetails(){
    this.showDetails = false
  }

  openUpdateStudent(student: Student){
    this.selectedStudent = student
    this.showDetails = true
    console.log(this.selectedStudent,"ssssssssssssssssssssssssssssss update");
    
  }

  openAddStudent(){
    this.selectedStudent = {id: Student.nextId, name: "", avrage:0}
    this.showDetails = true
    console.log(this.selectedStudent,"ssssssssssssssssssssssssssssss add");

  }
}
