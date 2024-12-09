import { Component, EventEmitter, numberAttribute, Output } from '@angular/core';
import { Student } from '../models/student.model';
import { Course } from '../models/course.model';
import { StudentService } from '../sevices/student.service';

@Component({
  selector: 'students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent {
  // students: Student[] = [new Student("noa"),new Student("avi"),new Student("moishie"),new Student("yael", new Date())]
  selectedStudent: Student = { id: Student.nextId, name: "", avrage: 0, isActive: true, year: 1, course: new Course(0, ""), absenceDays: [] }

  students!: Student[]
  absenceArr: number[] = []

  showDetails: boolean = false


  constructor(private _studentService: StudentService) {
  }

  async ngOnInit() {
    this.students = await this._studentService.getstudents()
    this.students.forEach(student => {      
      this._studentService.getAllAbsenceDays(student.id).then(totalDays => this.absenceArr.push(totalDays));
    })
  }

  

  deleteStudent(student: Student) {
    let studentInd: number = this.students.findIndex((studentEle: Student, index: number, obj: Student[]) => {
      return studentEle === student;
    });

    this.students.splice(studentInd, 1)
    this.absenceArr.splice(studentInd, 1)
  }

  updateOrAdd(student: Student) {
    if (student.id == Student.nextId)
      this.addStudent(student)
    else this.updateStudent(student)
    this.closeDetails()

  }

  addStudent(student: Student) {
    console.log(student, "aaaaaaaaaaaooooooooooooooooooooooooooorrrrrrrrrrrrrrrrrrrrruuuuuuuuuuuuuuuuuuuu");

    this.students.push(new Student(student.name, student.isActive, student.course, student.absenceDays, student.year, student.avrage, student.deparureDate))
    this._studentService.getAllAbsenceDays(student.id).then(totalDays => this.absenceArr.push(totalDays));
    this.alertSuccess('added', student)
  }

  async updateStudent(student: Student) {
    console.log(student, "update##################################");

    let studentInd: number = this.students.findIndex((studentEle: Student, index: number, obj: Student[]) => {
      return studentEle.id == student.id;
    });
    this.students[studentInd].name = student.name
    this.students[studentInd].isActive = student.isActive
    this.students[studentInd].year = student.year
    this.students[studentInd].course = student.course
    this.students[studentInd].deparureDate = student.deparureDate
    this.students[studentInd].avrage = student.avrage
    this.students[studentInd].absenceDays = student.absenceDays

    this._studentService.getAllAbsenceDays(student.id).then(totalDays => this.absenceArr[studentInd] = totalDays);

    this.alertSuccess("apdated", student)
  }

  alertSuccess(type: string, student: Student) {
    alert(`student ${student.id} was ${type} successfullly
      name: ${student.name} course: ${student.course} year: ${student.year}`)

  }

  closeDetails() {
    this.showDetails = false
  }

  openUpdateStudent(student: Student) {
    this.selectedStudent = student
    this.showDetails = true
  }

  openAddStudent() {
    this.selectedStudent = { id: Student.nextId, name: "", avrage: 0, isActive: true, course: new Course(0, ""), absenceDays: [] }
    this.showDetails = true
    console.log(this.selectedStudent, "ssssssssssssssssssssssssssssss add");

  }

  @Output()
  chooseId: EventEmitter<number> = new EventEmitter();

  selectedId(id: number) {
    console.log(id, "iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");

    this.chooseId.emit(id)
  }



  totalAbsenceDays(student: Student): number {
    // this.total = await this._studentService.getAllAbsenceDays(student.id)
    // return this.total
    const index = this.students.findIndex((studentEle: Student) => studentEle.id === student.id);
    return this.absenceArr[index]; 

  }
}
