import { Component, EventEmitter, numberAttribute, Output } from '@angular/core';
import { Student } from '../../../models/student.model';
import { Course } from '../../../models/course.model';
import { StudentService } from '../../../sevices/student.service';

@Component({
  selector: 'students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent {
  // students: Student[] = [new Student("noa"),new Student("avi"),new Student("moishie"),new Student("yael", new Date())]
  selectedStudent: Student = { id: 0, name: "", avrage: 0, isActive: true, year: 1, course: new Course(0, ""), absenceDays: [] }

  students!: Student[]
  absenceArr: number[] = []

  showDetails: boolean = false


  constructor(private _studentService: StudentService ) {
    _studentService.getStudentsFromServer().subscribe(data => {
      this.students = data
    })
  }

  async ngOnInit() {
    // this.students = await this._studentService.getstudents()
    // this.students.forEach(student => {      
    //   this._studentService.getAllAbsenceDays(student.id).then(totalDays => this.absenceArr.push(totalDays));
    // })
  }

  onSearchResults(results: Student[]) {
    console.log("res",results);
    
    this.students = results; // Update student list with search results
  }

  showActive(showActive: boolean){
    this._studentService.getStudentsByActive(showActive).subscribe(data => {
      this.students = data
    })
  }

  deleteStudent(student: Student) {
    let studentInd: number = this.students.findIndex((studentEle: Student, index: number, obj: Student[]) => {
      return studentEle === student;
    });
    this._studentService.deleteStudentServer(student.id).subscribe(data => {
      if (data) {
        this.students.splice(studentInd, 1)
        this.absenceArr.splice(studentInd, 1)
      }

    },
    err => {
      alert(err.error.message)
    }
  )
  }

  updateOrAdd(student: Student) {
    if (this.students.find(s => s.id === student.id))
      this.updateStudent(student)
    else this.addStudent(student)
    this.closeDetails()

  }

  addStudent(student: Student) {
    console.log(student, "aaaaaaaaaaaooooooooooooooooooooooooooorrrrrrrrrrrrrrrrrrrrruuuuuuuuuuuuuuuuuuuu");

    // this.students.push(new Student(student.name, student.isActive, student.course, student.absenceDays, student.year, student.avrage, student.deparureDate))
    this._studentService.addStudetToServer(student).subscribe(data => {
      this.students.push(data)
      this._studentService.getAllAbsenceDays(data.id).then(totalDays => this.absenceArr.push(totalDays));
      this.alertSuccess('added', data)
    })


  }

  async updateStudent(student: Student) {
    console.log(student, "update##################################");

    this._studentService.updateStudentServer(student).subscribe(data => {
      let studentInd: number = this.students.findIndex((studentEle: Student, index: number, obj: Student[]) => {
        return studentEle.id == student.id;
      });
      this.students[studentInd] = data
      this._studentService.getAllAbsenceDays(student.id).then(totalDays => this.absenceArr[studentInd] = totalDays);
      this.alertSuccess("updated", data)

    })

    // let studentInd: number = this.students.findIndex((studentEle: Student, index: number, obj: Student[]) => {
    //   return studentEle.id == student.id;
    // });
    // this.students[studentInd].name = student.name
    // this.students[studentInd].isActive = student.isActive
    // this.students[studentInd].year = student.year
    // this.students[studentInd].course = student.course
    // this.students[studentInd].deparureDate = student.deparureDate
    // this.students[studentInd].avrage = student.avrage
    // this.students[studentInd].absenceDays = student.absenceDays


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
    this.selectedStudent = { id: 0, name: "", avrage: 0, isActive: true, course: new Course(0, ""), absenceDays: [] }
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
